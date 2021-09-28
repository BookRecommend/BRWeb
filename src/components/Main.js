import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import Bestseller from "./BestsellerList";
import LibraryRank from './LibraryRank';
import BookList from "./BookList";
import Mypage from "./Mypage";
import RegionCodeTranslate from './RegionCodeTranslate';
import Login from './Login';
import RegionSelector from './RegionSelector';
import { selectRegion } from '../modules/SelectedRegionCode';
import "../style/Main.scss";


const END_POINT = `${process.env.REACT_APP_END_POINT}`;

function Main() {
    const [searchText, setSearchText] = useState("");
    const [books, setBook] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [display] = useState(10);
    const [searchState, setSearchState] = useState(false);
    const [openMypage, setOpenMypage] = useState(false);
    const [showRankBest, setShowRankBest] = useState(true);
    const [openRegionSelector, setOpenRegionSelector] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const loginState = useSelector(state => state.updateLoginState.login);
    const loginInfo = useSelector(state => state.updateLoginState.user);

    const selectedRegionCode = useSelector(state => state.selectedRegion);
    const region = RegionCodeTranslate({code: `${selectedRegionCode.region + selectedRegionCode.subregion}`});

    const dispatch = useDispatch();

    useEffect(() => {
        if (loginInfo.status === "new") {
            setOpenMypage(true);
            setShowRankBest(false);
        }
    },[loginInfo]);


    const getSearchBook = async () => {
        setLoadingState(true);
        try{
            const res = await axios.get(`${END_POINT}/search`, {
                params: {
                    query: searchText,
                },
            });
            const booklist = res.data.info.result.map((item, index) => ({
                id: index,
                title: item.title.replace(/(<([^>]+)>)/ig,""),
                image: item.image,
                author: item.author.replace(/(<([^>]+)>)/ig,""),
                isbn: item.isbn.replace(/(<([^>]+)>)/ig,""),
                year: item.year.replace(/(<([^>]+)>)/ig,""),
                description: item.description.replace(/(<([^>]+)>)/ig,""),
                publisher: item.publisher.replace(/(<([^>]+)>)/ig,""),
            }));
            
            let testlist = [];
            let totalpage = 0;
            
            for (let j = 0; j < display; j++) {
                let k = 0;
                let temp = [];
                for (let i = j*10; i < (j+1)*10; i++) {
                    if (typeof(booklist[i]) !== "undefined" && booklist[i] !== "undefined") {
                        temp[k] = booklist[i];
                        k++;
                    }
                }
                if (temp.length !== 0) {
                    testlist[j] = temp;
                    totalpage++;
                }
            };
            setTotalPage(totalpage);
            setBook(testlist);
            setSearchState(true);
            setLoadingState(false);
        } 
        catch (error) {
        console.log(error);
        setLoadingState(false);
        }
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setOpenMypage(false);
        setBook([]);
        setSearchState(false);
        setShowRankBest(false);
        setPage(1);
        getSearchBook();
        setTotalPage(0);
    }

    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            onSubmit(e);
        }
    }

    const onClickHomepage = () => {
        setOpenMypage(false);
        setBook([]);
        setSearchState(false);
        setShowRankBest(true);
        setPage(1);
        setTotalPage(0);
    }

    const renderSearchlist = () => {
        return (
            <div className="SearchList">
                {books[page-1].map((book, i) => <BookList key={book.id} book={book} i={i} frommypage={false}/>)}
            </div>
        )
    }

    const RenderPageButton = (props) => {
        return (
            <button className="SearchPageButton" onClick={() => setPage(props.i+1)}>{props.v}</button>
        )
    }

    const renderButton = useCallback(() => {
        let pagelist = [];
        for (let i = 0; i < totalPage; i++){
            pagelist.push(i+1);
        }
        if (totalPage > 1){
            return (
                <div className="SearchPager">  
                    {pagelist.map((v, i) => <RenderPageButton key={i} v={v} i={i} />)}
                </div>
            );
        }        
    },[totalPage])

    const onUserInfoClick = () => {
        setBook([]);
        setPage(1);
        setTotalPage(0);
        setSearchState(false);
        setShowRankBest(false);
        setOpenMypage(true);
    }

    const renderUserInfo = useCallback(() => {
        return(
            <div className="UserInfoBox" onClick={onUserInfoClick}>
                <img className='UserThumb' src={loginInfo.imgURL} alt='userThumb'></img>
                <div className='UserInfo'>
                    {loginInfo.name}님 환영합니다.
                </div>
                
            </div>
        )

    },[loginInfo.imgURL, loginInfo.name])

    const renderMypage = () => {
        return (
            <Mypage setOpenMypage={setOpenMypage} setShowRankBest={setShowRankBest} />
        )
    }

    const onClickOpReSel = () => {
        if (openRegionSelector) {
            setOpenRegionSelector(false);
        }
        else {
            setOpenRegionSelector(true);
        }
    }

    const onClickRegionReset = () => {
        if (loginState) {
            dispatch(selectRegion({
                region: loginInfo.region,
                subregion: loginInfo.subregion,
            }));
        }
        else{
            dispatch(selectRegion({
                region: "11",
                subregion: "010",
            }));
        }
    }

    return (
            <div className="SiteFrame">
                <div className="SiteHead">
                    <div className="SiteName" onClick={onClickHomepage}>도서 추천 및 정보 제공 사이트</div>
                    <div className="Input">
                        <input
                            className="InputBar"
                            type="text"       
                            value={searchText}                 
                            onKeyUp={onKeyUp}
                            onChange={e => setSearchText(e.target.value)}
                            autoFocus
                        />
                        <button
                            className="InputButton"
                            onClick={onSubmit}>검색</button>
                    </div>
                    <div className="SearchRegionSelector">
                        <span onClick={onClickOpReSel}>도서관검색지역선택</span><br/>
                        
                        {openRegionSelector ? 
                        <>
                        <span>현재검색지역 : {region.fullName}</span><br/>
                        <RegionSelector changeLoginstate={false} setRegion={true}/>
                        <button className="RegionResetButton" onClick={onClickRegionReset}>초기화</button>
                        </>: null}
                    </div>
                        {loginState ? renderUserInfo() : <Login 
                        setOpenMypage={setOpenMypage}
                        />}
                </div>
                <div className="SiteBody">
                    {loadingState ? 'Loading...' : null}
                    {openMypage ? renderMypage() : null}
                    {(searchState) ? renderSearchlist() : null}
                    {showRankBest ? (<><Bestseller /><LibraryRank /></>) : null}
                    {(searchState) ? renderButton() : null}
                </div>
            </div>
    );
}

export default Main;