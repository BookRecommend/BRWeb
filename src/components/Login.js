import axios from 'axios';
import React, { useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../modules/LoginState';
import { selectRegion } from '../modules/SelectedRegionCode';
import Modal from "./Modal.js";

const clientId = `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`;
const END_POINT = `${process.env.REACT_APP_END_POINT}`;

function Login(props) {

    const dispatch = useDispatch();

    const[modal, setModal] = useState(false);
    const[modalInfo, setModalInfo] = useState({});
    const [loadingState, setLoadingState] = useState(false);
    
    const onSuccess = async (googleRes) => {
        setLoadingState(true);
        try {
            const res = await axios.post(`${END_POINT}/login`, JSON.stringify({username: String(googleRes.profileObj.googleId)}), {
                headers: {
                    "Content-Type": `application/json`,
                },
            });

            let userInfo = {};

            if (res.data.message === "registered") {
                userInfo = {
                    name: googleRes.profileObj.name, 
                    gender: res.data.info.gender,
                    age: res.data.info.age,
                    region: (res.data.info.region === "" ? "11" : res.data.info.region),
                    subregion: (res.data.info.subregion === "" ? "010" : res.data.info.subregion),
                    imgURL: googleRes.profileObj.imageUrl, 
                    username: String(googleRes.profileObj.googleId),
                    history: res.data.info.history,
                    status: "registered"
                };
                dispatch(updateLogin(userInfo));
                dispatch(selectRegion({
                    region: userInfo.region,
                    subregion: userInfo.subregion,
                }));
                setLoadingState(false);
            }
            else if (res.data.message === "new") {
                userInfo = {
                    name: googleRes.profileObj.name, 
                    gender: '2',
                    age: "-1",
                    region: "11",
                    subregion: "010",
                    imgURL: googleRes.profileObj.imageUrl, 
                    username: String(googleRes.profileObj.googleId),
                    history: [],
                    status: "new"
                };
                alert("신규회원입니다. 회원정보를 입력해주세요.");
                setLoadingState(false);
                dispatch(updateLogin(userInfo))
            }
            else {
                alert("로그인 실패");
                console.log('error, res:', res);
            };
            
        }
        catch (error) {
            alert("로그인 실패");
            console.log(error);
        }
    };
    const onFailure = (res) => {
        setModalInfo({
            title: "Login Fail",
            description: res.error,
            clickoff: true,
            callback: null
        });
        setModal(true);
    }

    return (
        <div className='GoogleLoginButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                />
            {modal ? <Modal
                setModal={setModal} 
                title={modalInfo.title}
                description={modalInfo.description}
                clickoff={modalInfo.clickoff}
                callback={modalInfo.callback}
                setOpenMypage={props.setOpenMypage}
                setShowRankBest={props.setShowRankBest}
                dispatch={dispatch}
            /> : null}
            {loadingState ? null : null}
        </div>
    );
}

export default Login;