import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { assetWatcher } from "./assetSaga";
import { debtWatcher } from "./debtSaga";
import { currencyWatcher } from "./currencySaga";
import { paymentAccountWatcher } from "./paymentAccountSaga";
import { cardWatcher } from "./cardSaga";
import { incomeWatcher } from "./incomeSaga";

export default function* rootSaga() {
  yield all([
    paymentAccountWatcher(),
    cardWatcher(),
    assetWatcher(),
    debtWatcher(),
    currencyWatcher(),
    incomeWatcher()
  ]);
}
