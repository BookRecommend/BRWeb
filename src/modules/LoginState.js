import { createAction, handleActions } from 'redux-actions';

const UPDATE_LOGIN = 'LoginState/UPDATE_LOGIN';
const UPDATE_LOGOUT = 'LoginState/UPDATE_LOGOUT';
const UPDATE_USERINFO = 'LoginState/UPDATE_USERINFO';

export const updateLogin = createAction(UPDATE_LOGIN, item => item);
export const updateLogout = createAction(UPDATE_LOGOUT, item => item);
export const updateUserInfo = createAction(UPDATE_USERINFO, item => item);

const initialState = {
    login: false,
    user : {name: '', imgURL: ''},
}

const updateLoginState = handleActions(
    {
        [UPDATE_LOGIN]: (state, action) => (
            {
                ...state,
                login: true,
                user: action.payload,
            }
        ),

        [UPDATE_LOGOUT]: (state) => (
            {
                ...state,
                login: false,
                user: {name: '', imgURL: ''},
        }
        ),

        [UPDATE_USERINFO]: (state, action) => (
            {
                ...state,
                user: action.payload,
            }
        ),
    },

    initialState,
)

export default updateLoginState;