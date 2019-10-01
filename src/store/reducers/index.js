import { combineReducers } from "redux";

const profile = (state = {}, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return { ...state };
    default:
      return state;
  }
};

const paymentAccounts = (
  state = {
    data: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case "GET_PAYMENT_ACCOUNTS":
    case "CREATE_PAYMENT_ACCOUNT":
      return { ...state, loading: true };
    case "PAYMENT_ACCOUNTS_RECIEVED":
      return { ...state, data: action.paymentAccounts, loading: false };
    default:
      return state;
  }
};

const cards = (
  state = {
    data: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case "GET_CARDS":
    case "CREATE_CARD":
      return { ...state, loading: true };
    case "CARDS_RECIEVED":
      return { ...state, data: action.cards, loading: false };
    default:
      return state;
  }
};

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

const currencies = (
  state = {
    data: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case "GET_CURRENCIES":
    case "CREATE_CURRENCY":
    case "PARSE_CURRENCIES":
      return { ...state, loading: true };
    case "CURRENCIES_RECIEVED":
      return { ...state, data: action.currencies, loading: false };
    default:
      return state;
  }
};

const coinPurseApp = combineReducers({
  profile,
  paymentAccounts,
  cards,
  assets,
  debts,
  currencies
});

export default coinPurseApp;
