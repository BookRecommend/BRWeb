import React from 'react';
import { useDispatch } from 'react-redux';
import { updateLogout } from '../modules/LoginState';
import { GoogleLogout } from 'react-google-login';
import { selectRegion } from '../modules/SelectedRegionCode';

const clientId = `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`;

function Logout(props) {

    const dispatch = useDispatch();

    const onSuccess = () => {
        props.setOpenMypage(false);
        props.setShowRankBest(true);
        dispatch(updateLogout());
        dispatch(selectRegion({region: "11", subregion: "010"}));
    };

    return (
        <>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </>
    );
}

export default Logout;