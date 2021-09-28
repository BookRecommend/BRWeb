import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUserInfo, updateLogout } from '../modules/LoginState';
import { selectRegion } from '../modules/SelectedRegionCode';
import BookList from './BookList';
import RegionCodeTranslate from './RegionCodeTranslate';
import Logout from './Logout';
import axios from 'axios';
import Modal from "./Modal.js";
import "../style/Mypage.scss"

const END_POINT = `${process.env.REACT_APP_END_POINT}`;

function Mypage(props) {
    
    const loginInfo = useSelector(state => state.updateLoginState.user);
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const [editState, setEditState] = useState(false);
    const [selectedGender, setSelectedGender] = useState(loginInfo.gender);
    const [selectedAge, setSelectedAge] = useState(loginInfo.age);
    const [selectedRegion, setSelectRegion] = useState("서울특별시");
    const [selectedCity, setSelectCity] = useState("");
    const[modal, setModal] = useState(false);
    const[modalInfo, setModalInfo] = useState({});

    const gender = ["남성", "여성", "비공개"];
    const age = {
        "0": "영유아(0~5세)",
        "6": "유아(6~7세)",
        "8": "초등(8~13세)",
        "14": "청소년(14~19세)",
        "20": "20대",
        "30": "30대",
        "40": "40대",
        "50": "50대",
        "60": "60세 이상",
        "-1": "비공개",
    };

    useEffect(() => {
        if (loginInfo.status !== "registered") {
            setEditState(true);
        }
    },[loginInfo]);

    const region = RegionCodeTranslate({code: `${loginInfo.region + loginInfo.subregion}`});

    const renderUser = () => {
        return(
            <div className="UserInfo">
                <span>성별 : {gender[loginInfo.gender]}</span>
                <span>나이 : {age[loginInfo.age]}</span>
                <span>지역 : {region.fullName}</span>
                <button className="UpdateButton" onClick={() => setEditState(true)}>수정</button>
            </div>
        )
    }

    const renderEditUser = () => {
        

        const onGenderChange = (e) => {
            setSelectedGender(e.target.value);
        }
        const onAgeChange = (e) => {
            setSelectedAge(e.target.value);
        }

        const onSubmitui = (data) => {
            let GENDER_VALUE = data.genderArr;
            let AGE_VALUE = data.ageArr;
            let REGION_VALUE = data.regionArr;
            let CITY_VALUE = data.cityArr;
            let TOWN_VALUE = data.townArr;
            let regiont = "";
            let subregiont = "";
            let newloginInfo = {};

            if (selectedCity !== "군/구" && selectedCity !== "시/군/구" && selectedCity.length > 0){
                if (MetropolitanCity.includes(REGION_VALUE)){
                    regiont = regionCode[REGION_VALUE];
                    subregiont = dtl_regionCode[REGION_VALUE][CITY_VALUE];
                }
                else{
                    regiont = regionCode[REGION_VALUE];
                    subregiont = dtl_regionCode[REGION_VALUE][CITY_VALUE][TOWN_VALUE];
                }

                if (GENDER_VALUE !== "none" && AGE_VALUE !== "none"){
                    newloginInfo = {
                        username: loginInfo.username,
                        gender: GENDER_VALUE,
                        age: AGE_VALUE,
                        region: regiont,
                        subregion: subregiont
                    }
                    try{
                        axios.put(`${END_POINT}/member`, JSON.stringify(newloginInfo), {
                            headers: {
                                "Content-Type": `application/json`,
                            },
                        }).then(() => {
                            setEditState(false)
                            setModalInfo({
                                title: "회원정보수정 성공",
                                description: "회원정보 수정에 성공하였습니다.",
                                clickoff: true,
                                callback: null
                            });
                            setModal(true);
                        })
                        dispatch(updateUserInfo({
                            ...loginInfo,
                            gender: GENDER_VALUE,
                            age: AGE_VALUE,
                            region: regiont,
                            subregion: subregiont,
                            status: "registered"
                        }));
                        dispatch(selectRegion({
                            region: regiont,
                            subregion: subregiont
                        }))
                    }
                    catch (error) {
                        console.log(error);
                    }
                } else if (GENDER_VALUE === "none") {
                    alert("성별을 선택하세요");
                } else if (AGE_VALUE === "none") {
                    alert("나이를 선택하세요");
                } else {
                    alert("Error");
                };
            }
            else{
                alert("시/군/구 를 선택해주세요. 기본설정은 서울 종로구 입니다.")
            }
        }

        const regionCode = {
            서울특별시: '11',
            부산광역시: '21',
            대구광역시: '22',
            인천광역시: '23',
            광주광역시: '24',
            대전광역시: '25',
            울산광역시: '26',
            세종특별자치시: '29',
            경기도: '31',
            강원도: '32',
            충청북도: '33',
            충청남도: '34',
            전라북도: '35',
            전라남도: '36',
            경상북도: '37',
            경상남도: '38',
            제주특별자치도: '39',
        };
    
        const dtl_regionCode = {
            서울특별시: {
                종로구: '010',
                중구:   '020',
                용산구: '030',
                성동구: '040',
                광진구: '050',
                동대문구: '060',
                중랑구: '070',
                성북구: '080',
                강북구: '090',
                도봉구: '100',
                노원구: '110',
                은평구: '120',
                서대문구: '130',
                마포구: '140',
                양천구: '150',
                강서구: '160',
                구로구: '170',
                금천구: '180',
                영등포구: '190',
                동작구: '200',
                관악구: '210',
                서초구: '220',
                강남구: '230',
                송파구: '240',
                강동구: '250',
            },
            부산광역시: {
                중구:   '010',
                서구:   '020',
                동구:   '030',
                영도구: '040',
                부산진구: '050',
                동래구: '060',
                남구:   '070',
                북구:   '080',
                해운대구: '090',
                사하구: '100',
                금정구: '110',
                강서구: '120',
                연제구: '130',
                수영구: '140',
                사상구: '150',
                기장군: '310',
            },
            대구광역시: {
                중구:   '010',
                동구:   '020',
                서구:   '030',
                남구:   '040',
                북구:   '050',
                수성구: '060',
                달서구: '070',
                달성군: '310',
            },
            인천광역시: {
                중구:   '010',
                동구:   '020',
                남구:   '030',
                연수구: '040',
                남동구: '050',
                부평구: '060',
                계양구: '070',
                서구:   '080',
                강화군: '310',
                옹진군: '320',
            },
            광주광역시: {
                동구:   '010',
                서구:   '020',
                남구:   '030',
                북구:   '040',
                광산구: '050',
            },
            대전광역시: {
                동구:   '010',
                중구:   '020',
                서구:   '030',
                유성구: '040',
                대덕구: '050',
            },
            울산광역시: {
                중구:   '010',
                남구:   '020',
                동구:   '030',
                북구:   '040',
                울주군: '310',
            },
            세종특별자치시: {
                세종시: '010',
            },
            경기도: {
                수원시: {
                    전체: '010',
                    장안구: '011',
                    권선구: '012',
                    팔달구: '013',
                    영통구: '014',
                },
                성남시: {
                    전체: '020',
                    수정구: '021',
                    중원구: '022',
                    분당구: '023',
                },
                의정부시: {
                    전체: '030',
                },
                안양시: {
                    전체: '040',
                    만안구: '041',
                    동안구: '042',
                },
                부천시: {
                    전체: '050',
                },
                광명시: {
                    전체: '060',
                },
                평택시: {
                    전체: '070',
                },
                동두천시: {
                    전체: '080',
                },
                안산시: {
                    전체: '090',
                    상록구: '091',
                    단원구: '092',
                },
                고양시: {
                    전체: '100',
                    덕양구: '101',
                    일산동구: '103',
                    일산서구: '104',
                },
                과천시: {
                    전체: '110',
                },
                구리시: {
                    전체: '120',
                },
                남양주시: {
                    전체: '130',
                },
                오산시: {
                    전체: '140',
                },
                시흥시: {
                    전체: '150',
                },
                군포시: {
                    전체: '160',
                },
                의왕시: {
                    전체: '170',
                },
                하남시: {
                    전체: '180',
                },
                용인시: {
                    전체: '190',
                    처인구: '191',
                    기흥구: '192',
                    수지구: '193',
                },
                파주시: {
                    전체: '200',
                },
                이천시: {
                    전체: '210',
                },
                안성시: {
                    전체: '220',
                },
                김포시: {
                    전체: '230',
                },
                화성시: {
                    전체: '240',
                },
                광주시: {
                    전체: '250',
                },
                양주시: {
                    전체: '260',
                },
                포천시: {
                    전체: '270',
                },
                여주시: {
                    전체: '280',
                },
                연천군: {
                    전체: '350',
                },
                가평군: {
                    전체: '370',
                },
                양평군: {
                    전체: '380',
                },
            },
            강원도: {
                춘천시: {
                    전체: '010',
                },
                원주시: {
                    전체: '020',
                },
                강릉시: {
                    전체: '030',
                },
                동해시: {
                    전체: '040',
                },
                태백시: {
                    전체: '050',
                },
                속초시: {
                    전체: '060',
                },
                삼척시: {
                    전체: '070',
                },
                홍천군: {
                    전체: '310',
                },
                횡성군: {
                    전체: '320',
                },
                영월군: {
                    전체: '330',
                },
                평창군: {
                    전체: '340',
                },
                정선군: {
                    전체: '350',
                },
                철원군: {
                    전체: '360',
                },
                화천군: {
                    전체: '370',
                },
                양구군: {
                    전체: '380',
                },
                인제군: {
                    전체: '390',
                },
                고성군: {
                    전체: '400',
                },
                양양군: {
                    전체: '410',
                },
            },
            충청북도: {
                충주시: {
                    전체: '020',
                },
                제천시: {
                    전체: '030',
                },
                청주시: {
                    전체: '040',
                    상당구: '041',
                    서원구: '042',
                    흥덕구: '043',
                    청원구: '044',
                },
                보은군: {
                    전체: '320',
                },
                옥천군: {
                    전체: '330',
                },
                영동군: {
                    전체: '340',
                },
                진천군: {
                    전체: '350',
                },
                괴산군: {
                    전체: '360',
                },
                음성군: {
                    전체: '370',
                },
                단양군: {
                    전체: '380',
                },
                증평군: {
                    전체: '390',
                },
            },
            충청남도: {
                천안시: {
                    전체: '010',
                    동남구: '011',
                    서북구: '012',
                },
                공주시: {
                    전체: '020',
                },
                보령시: {
                    전체: '030',
                },
                아산시: {
                    전체: '040',
                },
                서산시: {
                    전체: '050',
                },
                논산시: {
                    전체: '060',
                },
                계룡시: {
                    전체: '070',
                },
                당진시: {
                    전체: '080',
                },
                금산군: {
                    전체: '310',
                },
                부여군: {
                    전체: '330',
                },
                서천군: {
                    전체: '340',
                },
                청양군: {
                    전체: '350',
                },
                홍성군: {
                    전체: '360',
                },
                예산군: {
                    전체: '370',
                },
                태안군: {
                    전체: '380',
                },
            },
            전라북도: {
                전주시: {
                    전체: '010',
                    완산구: '011',
                    덕진구: '012',
                },
                군산시: {
                    전체: '020',
                },
                익산시: {
                    전체: '030',
                },
                정읍시: {
                    전체: '040',
                },
                남원시: {
                    전체: '050',
                },
                김제시: {
                    전체: '060',
                },
                완주군: {
                    전체: '310',
                },
                진안군: {
                    전체: '320',
                },
                무주군: {
                    전체: '330',
                },
                장수군: {
                    전체: '340',
                },
                임실군: {
                    전체: '350',
                },
                순창군: {
                    전체: '360',
                },
                고창군: {
                    전체: '370',
                },
                부안군: {
                    전체: '380',
                },            
            },
            전라남도: {
                목포시: {
                    전체: '010',
                },
                여수시: {
                    전체: '020',
                },
                순천시: {
                    전체: '030',
                },
                나주시: {
                    전체: '040',
                },
                광양시: {
                    전체: '060',
                },
                담양군: {
                    전체: '310',
                },
                곡성군: {
                    전체: '320',
                },
                구례군: {
                    전체: '330',
                },
                고흥군: {
                    전체: '350',
                },
                보성군: {
                    전체: '360',
                },
                화순군: {
                    전체: '370',
                },
                장흥군: {
                    전체: '380',
                },
                강진군: {
                    전체: '390',
                },
                해남군: {
                    전체: '400',
                },
                영암군: {
                    전체: '410',
                },
                무안군: {
                    전체: '420',
                },
                함평군: {
                    전체: '430',
                },
                영광군: {
                    전체: '440',
                },
                장성군: {
                    전체: '450',
                },
                완도군: {
                    전체: '460',
                },
                진도군: {
                    전체: '470',
                },
                신안순: {
                    전체: '480',
                },
            },
            경상북도: {
                포항시: {
                    전체: '010',
                    남구:   '011',
                    북구:   '012',
                },
                경주시: {
                    전체: '020',
                },
                김천시: {
                    전체: '030',
                },
                안동시: {
                    전체: '040',
                },
                구미시: {
                    전체: '050',
                },
                영주시: {
                    전체: '060',
                },
                영천시: {
                    전체: '070',
                },
                상주시: {
                    전체: '080',
                },
                문경시: {
                    전체: '090',
                },
                경산시: {
                    전체: '100',
                },
                군위군: {
                    전체: '310',
                },
                의성군: {
                    전체: '320',
                },
                청송군: {
                    전체: '330',
                },
                영양군: {
                    전체: '340',
                },
                영덕군: {
                    전체: '350',
                },
                청도군: {
                    전체: '360',
                },
                고령군: {
                    전체: '370',
                },
                성주군: {
                    전체: '380',
                },
                칠곡군: {
                    전체: '390',
                },
                예천군: {
                    전체: '400',
                },
                봉화군: {
                    전체: '410',
                },
                울진군: {
                    전체: '420',
                },
                울릉군: {
                    전체: '430',
                },
            },
            경상남도: {
                진주시: {
                    전체: '030',
                },
                통영시: {
                    전체: '050',
                },
                사천시: {
                    전체: '060',
                },
                김해시: {
                    전체: '070',
                },
                밀양시: {
                    전체: '080',
                },
                거제시: {
                    전체: '090',
                },
                양산시: {
                    전체: '100',
                },
                창원시: {
                    전체: '110',
                    의창구: '111',
                    성산구: '112',
                    마산합포구: '113',
                    마산회원구: '114',
                    진해구: '115',
                },
                의령군: {
                    전체: '310',
                },
                함안군: {
                    전체: '320',
                },
                창녕군: {
                    전체: '330',
                },
                고성군: {
                    전체: '340',
                },
                남해군: {
                    전체: '350',
                },
                하동군: {
                    전체: '360',
                },
                산청군: {
                    전체: '370',
                },
                함양군: {
                    전체: '380',
                },
                거창군: {
                    전체: '390',
                },
                합천군: {
                    전체: '400',
                },
            },
            제주특별자치도: {
                제주시: {
                    전체: '010',
                },
                서귀포시: {
                    전체: '020',
                },
            },
        };
    
        const MetropolitanCity = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시'];
        
        const regionOption = (k, v) => {
            return (
                <option key={k} value={v}>{k}</option>
            )    
        }
    
        const RenderSelectTown = () => {
            return (
                <select {...register("townArr")}>
                        {Object.keys(dtl_regionCode[selectedRegion][selectedCity]).map(town => regionOption(town))}
                </select>
            )
        }
    
        const regionOnChange = (e) => {
            setSelectRegion(e.target.value);
            setSelectCity("");
        }


        return(
            <form className="UpdateInfo" onSubmit={handleSubmit(onSubmitui)}>
                <span>성별 : </span>
                <select {...register("genderArr")} value={selectedGender} onChange={onGenderChange}>
                    <option value="0">남성</option>
                    <option value="1">여성</option>
                    <option value="2">비공개</option>
                </select>
                
                <span>나이 : </span>
                <select {...register("ageArr")} value={selectedAge} onChange={onAgeChange}>
                    <option value="0">영유아(0~5세)</option>
                    <option value="6">유아(6~7세)</option>
                    <option value="8">초등(8~13세)</option>
                    <option value="14">청소년(14~19세)</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대</option>
                    <option value="50">50대</option>
                    <option value="60">60세 이상</option>
                    <option value="-1">비공개</option>
                </select>
                
                <span>지역 : </span>
                <div className="MypageSelectBox">                    
                        <select {...register("regionArr")} onChange={(e) => regionOnChange(e)}>
                            {Object.keys(regionCode).map(region => regionOption(region))}
                        </select>
                        <select {...register("cityArr")} onChange={(e) => setSelectCity(e.target.value)}>
                            {MetropolitanCity.includes(selectedRegion) ?
                            <option key="none">군/구</option> : <option key="none">시/군/구</option> }   
                            {Object.keys(dtl_regionCode[selectedRegion]).map(city => regionOption(city))}
                        </select>
                        {MetropolitanCity.includes(selectedRegion) || selectedCity.length < 1  ?
                        null : RenderSelectTown() }
                </div>
                <div className="SubmitButton">
                    <input type="submit" value="수정" />
                    <input type="button" onClick={() => ( loginInfo.status === "new" ? alert("초기정보를 입력해주세요.") : setEditState(false))} value="취소" />
                </div>
            </form>
        )
    }

    const deleteUser = () => {
        setModalInfo({
            title: "회원탈퇴",
            description: "회원탈퇴 하시겠습니까? 계정의 모든정보가 폐기됩니다.",
            clickoff: false,
            callback: deleteUserApi
        });
        setModal(true);
    }

    const deleteUserApi = () => {
        try{
            axios({
                method: "DELETE",
                url: END_POINT+"/member",
                data: {
                    username: loginInfo.username
                }
            }).then((res) => {
                props.setOpenMypage(false);
                props.setShowRankBest(true);
                dispatch(updateLogout());
            })
            

            
        }
        catch (error) {
            console.log(error);
        }
    }

    const renderHistory = useCallback(() => {
        if (loginInfo.history.length > 0) {
            return(
                loginInfo.history.map((book, i) => <BookList key={book.bookId} book={book} i={i} frommypage={true} />)
            )
        } else{
            return("비어있음")
        }
    },[loginInfo])
    
    return(
        <div className="Mypage">
            <h2>{loginInfo.name}님의 마이페이지</h2>
            {editState ? renderEditUser() : renderUser()}
                

            <div className="GoogleLogoutButton">
                <Logout 
                    setOpenMypage={props.setOpenMypage}
                    setShowRankBest={props.setShowRankBest}
                />
            </div>
            <div>
                <button onClick={deleteUser}>회원탈퇴</button>
            </div>

            <div className="SearchHistory">
                <h2>검색기록</h2>
                {renderHistory()}
            </div>
            {modal ? <Modal
                setModal={setModal} 
                title={modalInfo.title}
                description={modalInfo.description}
                clickoff={false}
                callback={modalInfo.callback}
                setOpenMypage={props.setOpenMypage}
                setShowRankBest={props.setShowRankBest}
                dispatch={dispatch}
                updateLogout={updateLogout}
            /> : null}
        </div>
    );
}

export default Mypage;