import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../modules/LoginState';
import { selectRegion } from '../modules/SelectedRegionCode';
import { useForm } from 'react-hook-form';



function RegionSelector(props) {

    const dispatch = useDispatch();
    const loginInfo = useSelector(state => state.updateLoginState.user);
    const [selectedRegion, setSelectRegion] = useState("서울특별시");
    const [selectedCity, setSelectCity] = useState("");
    const [selectedTown, setSelectTown] = useState("전체");
    const { register, handleSubmit } = useForm();

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

    const dtl_regionCode = useMemo(() => ({
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
    }),[]);

    const MetropolitanCity = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시'];

    let REGION_VALUE = "";
    let CITY_VALUE = "";
    let TOWN_VALUE = "";

    const onSubmit = (data) => {
        REGION_VALUE = data.regionArr;
        CITY_VALUE = data.cityArr;
        TOWN_VALUE = data.townArr;

        if (selectedCity !== "군/구" && selectedCity !== "시/군" && selectedCity.length > 0){
            if (MetropolitanCity.includes(REGION_VALUE)){
                let newloginInfo = {
                    ...loginInfo,
                    region: regionCode[REGION_VALUE],
                    subregion: dtl_regionCode[REGION_VALUE][CITY_VALUE],
                };
                let temp = {
                    region: regionCode[REGION_VALUE],
                    subregion: dtl_regionCode[REGION_VALUE][CITY_VALUE],
                };
        
                if (props.changeLoginstate) {
                    dispatch(updateUserInfo(newloginInfo))
                };
                if(props.setRegion) {
                    dispatch(selectRegion(temp))
                };

            }
            else{
                if (selectedTown !== "지역구" && selectedTown.length > 0){
                    let newloginInfo = {
                        ...loginInfo,
                        region: regionCode[REGION_VALUE],
                        subregion: (typeof(dtl_regionCode[REGION_VALUE][CITY_VALUE][TOWN_VALUE]) === "undefined" ? dtl_regionCode[REGION_VALUE][CITY_VALUE]["전체"] : dtl_regionCode[REGION_VALUE][CITY_VALUE][TOWN_VALUE]),
                    };
                    let temp = {
                        region: regionCode[REGION_VALUE],
                        subregion: (typeof(dtl_regionCode[REGION_VALUE][CITY_VALUE][TOWN_VALUE]) === "undefined" ? dtl_regionCode[REGION_VALUE][CITY_VALUE]["전체"] : dtl_regionCode[REGION_VALUE][CITY_VALUE][TOWN_VALUE]),
                    };
    
                    if(props.changeLoginstate) {
                        dispatch(updateUserInfo(newloginInfo))
                    };
                    if(props.setRegion) {
                        dispatch(selectRegion(temp))
                    };
                }
                else{
                    alert("지역구를 선택해주세요.");
                }
                
            }       
        }
        else{
            alert("시/군/구 를 선택해주세요.");
        }
    }

    const regionOption = (k, v) => {
        return (
            <option key={k} value={k}>{k}</option>
        )    
    }

    const regionOnChange = (e) => {
        setSelectRegion(e.target.value);
        setSelectCity("");
        setSelectTown("전체");
    }

    const cityOnChange = (e) => {
        setSelectCity(e.target.value);
        setSelectTown("전체");
    }

    return(
        <div className="selectbox">
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("regionArr")} onChange={(e) => regionOnChange(e)}>
                    {Object.keys(regionCode).map(region => regionOption(region))}
                </select>
                <select {...register("cityArr")} value={selectedCity} onChange={(e) => cityOnChange(e)}>
                    {MetropolitanCity.includes(selectedRegion) ?
                    <option key="none" value="" disabled>군/구</option> : <option key="none" value="" disabled>시/군</option>}   
                    {Object.keys(dtl_regionCode[selectedRegion]).map(city => regionOption(city))}
                </select>
                <select {...register("townArr")} style={MetropolitanCity.includes(selectedRegion) || selectedCity.length < 1  ?
                                                        {display: 'none'}:{}} value={selectedTown} onChange={(e) => setSelectTown(e.target.value)}>
                    {MetropolitanCity.includes(selectedRegion) || selectedCity.length < 1  ?
                    null : Object.keys(dtl_regionCode[selectedRegion][selectedCity]).map(town => regionOption(town))}
                </select>
                <input type="submit" value="지역선택" />
            </form>
        </div>
        
    )
}



export default RegionSelector;