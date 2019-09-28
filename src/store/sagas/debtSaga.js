import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { DebtService } from "../../sources/db/debtService";

export function* getDebts() {
  const _service = new DebtService();
  const debts = yield _service.getDebts();
  yield put({ type: "DEBTS_RECIEVED", debts });
}

export function* createDebt(debt) {
  const _service = new DebtService();
  const newDebt = yield _service.addDebt(debt);
  yield put({ type: "GET_DEBTS" });
}

export function* debtWatcher() {
  yield takeLatest("GET_DEBTS", getDebts);
  yield takeLatest("CREATE_DEBT", createDebt);
}
