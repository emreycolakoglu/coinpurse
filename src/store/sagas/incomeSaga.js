import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { IncomeService } from "../../sources/db/incomeService";

export function* getIncomes(action) {
  const _service = new IncomeService();
  const incomes = yield _service.getIncomes();
  yield put({ type: "INCOMES_RECIEVED", incomes });
}

export function* findIncomes(action) {
  const _service = new IncomeService();
  const incomes = yield _service.findIncomes(action.query);
  yield put({ type: "INCOMES_RECIEVED", incomes });
}

export function* createIncome(action) {
  const _service = new IncomeService();
  const newIncome = yield _service.addIncome(action.income);
  yield put({ type: "GET_INCOMES" });
  yield put({
    type: "MODIFY_PAYMENT_ACCOUNT_AMOUNT",
    paymentAccountId: action.income.paymentAccountId,
    amount: action.income.amount
  });
}

export function* deleteIncome(action) {
  const _service = new IncomeService();
  const income = yield _service.getIncomeById(action.id);
  const sth = yield _service.removeIncome(action.id);
  yield put({ type: "GET_INCOMES" });
  yield put({
    type: "MODIFY_PAYMENT_ACCOUNT_AMOUNT",
    paymentAccountId: income[0].paymentAccountId,
    amount: -income[0].amount
  });
}

export function* deleteIncomesOfPaymentAccount(action){
  const _service = new IncomeService();
  const incomes = yield _service.findIncomes({
    paymentAccountId: action.paymentAccountId
  })
  for (let i = 0; i < incomes.length; i++) {
    const inc = incomes[i];
    yield _service.removeIncome(inc.id);
  }
  yield put({ type: "GET_INCOMES" });
}

export function* incomeWatcher() {
  yield takeLatest("GET_INCOMES", getIncomes);
  yield takeLatest("FIND_INCOMES", findIncomes);
  yield takeLatest("CREATE_INCOME", createIncome);
  yield takeLatest("DELETE_INCOME", deleteIncome);
  yield takeLatest("DELETE_INCOME_OF_PAYMENT_ACTION", deleteIncomesOfPaymentAccount);
}
