import { combineReducers } from "redux";

const assets = (state = {
  data: [],
  loading: false
}, action) => {
  switch (action.type) {
    case "GET_ASSETS":
    case "CREATE_ASSET":
      return { ...state, loading: true };
    case "ASSETS_RECIEVED":
      return { ...state, data: action.assets, loading: false };
    default:
      return state;
  }
};

const coinPurseApp = combineReducers({
  assets
});

export default coinPurseApp;
