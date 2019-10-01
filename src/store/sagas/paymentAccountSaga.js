import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { PaymentAccountService } from "../../sources/db/paymentAccountService";

export function* getPaymentAccounts() {
  const _service = new PaymentAccountService();
  const paymentAccounts = yield _service.getPaymentAccounts();
  yield put({ type: "PAYMENT_ACCOUNTS_RECIEVED", paymentAccounts });
}

export function* createPaymentAccount(action) {
  const _service = new PaymentAccountService();
  const newPaymentAccount = yield _service.addPaymentAccount({
    ...action.paymentAccount,
    balance: 0
  });
  yield put({
    type: "CREATE_INCOME",
    income: {
      name: "Starting balance",
      amount: action.paymentAccount.balance,
      paymentAccountId: newPaymentAccount[0].id,
      incomeCategoryId: 6,
      date: new Date()
    }
  });
  yield put({ type: "GET_PAYMENT_ACCOUNTS" });
}

export function* editPaymentAccount(action) {
  const _service = new PaymentAccountService();
  const newPaymentAccount = yield _service.updatePaymentAccountById(
    action.id,
    action.paymentAccount
  );
  yield put({ type: "GET_PAYMENT_ACCOUNTS" });
}

export function* modifyPaymentAccount(action) {
  const _service = new PaymentAccountService();
  let pa = yield _service.getPaymentAccountById(action.paymentAccountId);
  if (pa && pa.length > 0) {
    pa[0].balance += action.amount;
    const modifiedPaymentAccount = yield _service.updatePaymentAccountById(
      action.paymentAccountId,
      pa[0]
    );
  }
  yield put({ type: "GET_PAYMENT_ACCOUNTS" });
}

export function* deletePaymentAccount(action) {
  const _service = new PaymentAccountService();
  const sth = yield _service.removePaymentAccount(action.id);
  yield put({ type: "GET_PAYMENT_ACCOUNTS" });
}

export function* paymentAccountWatcher() {
  yield takeLatest("GET_PAYMENT_ACCOUNTS", getPaymentAccounts);
  yield takeLatest("CREATE_PAYMENT_ACCOUNT", createPaymentAccount);
  yield takeLatest("EDIT_PAYMENT_ACCOUNT", editPaymentAccount);
  yield takeLatest("DELETE_PAYMENT_ACCOUNT", deletePaymentAccount);
  yield takeLatest("MODIFY_PAYMENT_ACCOUNT", modifyPaymentAccount);
}
