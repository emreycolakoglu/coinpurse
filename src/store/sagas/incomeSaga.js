import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { IncomeService } from "../../sources/db/incomeService";

export function* getIncomes() {
  const _service = new IncomeService();
  const incomes = yield _service.getIncomes();
  yield put({ type: "INCOMES_RECIEVED", incomes });
}

export function* createIncome(action) {
  const _service = new IncomeService();
  const newIncome = yield _service.addIncome(action.income);
  yield put({ type: "GET_INCOMES" });
}

export function* deleteIncome(action){
  const _service = new IncomeService();
  const sth = yield _service.removeIncome(action.id);
  yield put({ type: "GET_INCOMES" });
}

export function* incomeWatcher() {
  yield takeLatest("GET_INCOMES", getIncomes);
  yield takeLatest("CREATE_INCOME", createIncome);
  yield takeLatest("DELETE_INCOME", deleteIncome);
}
