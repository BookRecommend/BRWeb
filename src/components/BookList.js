import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import RegionCodeTranslate from './RegionCodeTranslate';
import RenderMaps from "./Map";
import { updateUserInfo } from '../modules/LoginState';
import "../style/BookList.scss";

const default_Thumbnail = `${process.env.REACT_APP_DEFAULT_THUMBNAIL}`;
const END_POINT = `${process.env.REACT_APP_END_POINT}`;

function leftPad(value) { if (value >= 10) { return value; } return `0${value}`; }

const BookList = (props) => {
    
    const selectedRegion = useSelector(state => state.selectedRegion);
    const loginState = useSelector(state=> state.updateLoginState.login);
    const loginInfo = useSelector(state=> state.updateLoginState.user);

    const { book, i, frommypage } = props;

    let deftoday = new Date();
    let today = `${deftoday.getFullYear()}-${leftPad(deftoday.getMonth() + 1)}-${leftPad(deftoday.getDate())}`;

    const dispatch = useDispatch();
    const[showDetail, setShowDetail] = useState(false);
    const[libSelected,setLibSelected] = useState(-1);
    const[bookDetail, setBookDetail] = useState({});
    const[loadingState, setLoadingState] = useState(false);

    const getBookDetail =  useCallback(async () => {
        setLoadingState(true);
        try{
            const res = await axios.post(`${END_POINT}/result`,
                JSON.stringify({
                    isbn: book.isbn,
                    title: book.title,
                    region: selectedRegion.region,
                    subregion: selectedRegion.subregion,
                    username: (loginState ? loginInfo.username : null),
                    date: today,
                    author: book.author,
                    publisher: book.publisher,
                    frommypage: (loginState ? frommypage === true ? true : false : true)
                }), {
                headers: {
                    "Content-Type": `application/json`,
                    },
            });
            if(res.data.message === "success"){
                setBookDetail(res.data);
                if (res.data.info.bookId > 0){
                    let temp = loginInfo.history;
                    temp.push({
                        bookId: res.data.info.bookId,
                        title: book.title,
                        date: today,
                        author: book.author,
                        publisher: book.publisher,
                        isbn: book.isbn,
                    });
                    dispatch(updateUserInfo({
                        ...loginInfo,
                        history: temp,
                    }));
                    
                }
            }
            else {
                setBookDetail({info:{price: "0", stock: ""} ,message: "failure"});
            }
            
        }
        catch (error) {
        console.log(error);
        alert("????????? ??????????????? ??????????????? ?????????????????????.")
        }
        setLoadingState(false);
    },[book, dispatch, frommypage, loginInfo, loginState, selectedRegion.region, selectedRegion.subregion, today]);

    const deleteSearchList = async () => {
        try{
            const res = await axios({
                method: 'DELETE',
                url: `${END_POINT}/member/history`,
                data: {
                    bookId: book.bookId
                }
            });
            if (res.data.message === "success") {
                alert("?????? ??????");
                let temp = loginInfo.history;
                //console.log("i", i);
                temp.splice(i, 1);
                //console.log("temp",temp);
                dispatch(updateUserInfo({
                    ...loginInfo,
                    history: temp,
                }));
            }
            else {
                alert("?????? ??????");
            }
        }
        catch (error) {
            console.log(error);
            alert("?????? ??????");
        }
    }

    const onClickfunc = useCallback( (props) => {
        if(props.showDtl === true){
            
            setLibSelected(-1);
            setShowDetail(false);
        }
        else{
            getBookDetail();
            setShowDetail(true);
        }
        
    },[getBookDetail]);


    const RenderLiblist = useCallback(() => {
        if (bookDetail.message === 'success') {
            if (bookDetail.info.libraries.length === 0) {
                return(
                    <p>?????? ?????? ????????? ???????????? ???????????? ????????????. (??? ?????? ????????? ?????? ???????????? ???????????????.)</p>
                )
            }
            else {
                return(
                    <>
                        <p>?????? ????????? ???????????? ????????? ??????</p>
                        <div className="LibraryList">
                            {bookDetail.info.libraries.map((lib, i) =><LibraryDetail key={lib.name} lib={lib} i={i} j={book.isbn} />)}
                        </div>
                    </>
                )
            }
        }
        else {
            return(
                <p>?????? ?????? ????????? ????????? ???????????? ????????????.</p>
            )
        }
    },[bookDetail, book]);

    const libDtlOnClick = useCallback((i) => {
        if (libSelected !== i) {
            setLibSelected(i);
        }
        else if (libSelected === i) {
            setLibSelected(-1);
        }
    },[libSelected, setLibSelected])

    const LibraryDetail = useCallback((props) => {

        const { lib, i } = props;

        return(
            <>
                <div className="LibraryInfo">
                    <details>
                        <summary><span onClick={() => libDtlOnClick(i)}>{lib.name}</span></summary><br/>
                        <div className="Library">
                            <div>
                                <span className={"LibAddress"}>?????? : {lib.address}</span><br/><br/>
                                <span>???????????? : {lib.available === 'Y' ? "????????????" : "?????????"}</span>
                            </div>
                            <RenderMaps location={{
                                    longitude: lib.longitude,
                                    latitude: lib.latitude
                                }} i={i} />
                        </div>
                    </details>
                </div>
            </>
        )
    },[libDtlOnClick])

    


    const renderDetail = useCallback((book) => {

        let temp = RegionCodeTranslate({code: selectedRegion.region + selectedRegion.subregion});

        return (
            <>
                <tr>
                    <td colSpan="2">
                        <div className="BookDetailInfo">
                            <span>{book.description}</span><br/>
                            <span>?????? : {bookDetail.info.price}???</span><br/>
                            <span>?????? : {bookDetail.info.stock === "available" ? "?????? ??????" : "?????? ??????"}</span>
                            <div className="LibraryInfo">
                                <div className="LibraryDetailInfo">
                                    <p>????????? ?????? : {temp.fullName}</p>
                                    <RenderLiblist bookDetail={bookDetail}/>
                                </div>
                                {}
                            </div>            
                        </div>               
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <div style={{textAlign: "center"}}>
                            <button className="CloseDetailButton" onClick={() => setShowDetail(false)}>
                                ??????
                            </button>
                        </div>
                    </td>
                </tr>
            </>
        )
    },[selectedRegion, bookDetail])

    const handleImgError = (e) => {
        e.target.src = default_Thumbnail;
    }

    const renderLoading = () => {
        return(
            <tr>
                <td>
                    <span>Loading...</span>
                </td>
            </tr>
        )
    }
    
    return (
        <div className="BookInfoBox" >
            <table style={{width: "100%"}}>
                <tbody>
                    <tr onClick={() => onClickfunc(props={e: i+1, showDtl: showDetail})} style={{display: "flex",alignItems: "center" , minHeight: "125px"}}>
                        <td className="BookImgTable">
                            <img className="BookImg" src={book.image ? book.image : default_Thumbnail} onError={handleImgError} alt={book.title} />
                        </td>                                                                
                        <td>
                            <span>{typeof(book.rank) !== 'undefined' && book.rank+". "}{book.title}</span>
                            <br></br>
                            <span>{book.author}</span>
                            <span>???</span>
                            <span>{book.publisher}</span>
                            <span>???</span>
                            <span>{book.isbn}</span>
                            <span>???</span>
                            <span>{frommypage ? book.date : book.year}</span>
                            
                        </td>                                         
                    </tr>                                    
                    {showDetail ?
                    (loadingState ? renderLoading() : renderDetail(book))
                    : null}
                </tbody>
            </table>
            {frommypage ?
                            <button className="DeleteSearchListButton" onClick={() => deleteSearchList()}>
                                X
                            </button> : null}
        </div>
    );
};


export default BookList;
