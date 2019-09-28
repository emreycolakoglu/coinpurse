import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { CurrencyService } from "../../sources/db/currencyService";

export function* getDebts() {
  const _service = new CurrencyService();
  const currencies = yield _service.getCurrencies();
  yield put({ type: "CURRENCIES_RECIEVED", currencies });
}

export function* createDebt(currency) {
  const _service = new CurrencyService();
  const newCurrency = yield _service.addCurrency(currency);
  yield put({ type: "GET_CURRENCIES" });
}

export function* currencyWatcher() {
  yield takeLatest("GET_CURRENCIES", getDebts);
  yield takeLatest("CREATE_CURRENCY", createDebt);
}
