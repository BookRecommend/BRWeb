import { createAction, handleActions } from 'redux-actions';

const SELECT_REGION = 'SelectedRegionCode/SELECT_REGION';

export const selectRegion = createAction(SELECT_REGION, item => item);

const initialState = {
    region: "11",
    subregion: "010",
};

const selectedRegion = handleActions(
    {
        [SELECT_REGION]: (state, action) => (
            {
                ...state,
                region: action.payload.region,
                subregion: action.payload.subregion,
            }
        ),
    },

    initialState,
)

export default selectedRegion;