import { combineReducers } from "redux";

const assets = (
  state = {
    data: [],
    loading: false
  },
  action
) => {
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

const debts = (
  state = {
    data: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case "GET_DEBTS":
    case "CREATE_DEBT":
      return { ...state, loading: true };
    case "DEBTS_RECIEVED":
      return { ...state, data: action.debts, loading: false };
    default:
      return state;
  }
};

const coinPurseApp = combineReducers({
  assets,
  debts
});

export default coinPurseApp;
