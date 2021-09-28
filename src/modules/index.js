import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import updateLoginState from './LoginState';
import selectedRegion from './SelectedRegionCode';

const config = {
    key: "root",
    storage,
    whitelist: ["updateLoginState", "selectedRegion"]
};

const rootReducer = combineReducers({
    updateLoginState,
    selectedRegion,
});

export default persistReducer(config, rootReducer);