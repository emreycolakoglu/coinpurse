import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { CurrencyService } from "../../sources/db/currencyService";

export function* getCurrencies() {
  const _service = new CurrencyService();
  const currencies = yield _service.getCurrencies();
  yield put({ type: "CURRENCIES_RECIEVED", currencies });
}

export function* createCurrency(currency) {
  const _service = new CurrencyService();
  const newCurrency = yield _service.addCurrency(currency);
  yield put({ type: "GET_CURRENCIES" });
}

export function* parseCurrencies() {
  const _service = new CurrencyService();
  const currencyData = yield _service.downloadCurrencyData();
  const rowData = Object.keys(currencyData).map(function(key) {
    return [key, currencyData[key]];
  });
  const addableData = rowData.map((c) => {
    return {
      name: c[0],
      rate: c[1]
    };
  });
  const result = yield _service.massAddCurrency(addableData);
  yield put({ type: "GET_CURRENCIES" });
}

export function* currencyWatcher() {
  yield takeLatest("GET_CURRENCIES", getCurrencies);
  yield takeLatest("CREATE_CURRENCY", createCurrency);
  yield takeLatest("PARSE_CURRENCIES", parseCurrencies);
}
