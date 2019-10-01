import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { CardService } from "../../sources/db/cardService";

export function* getCards() {
  const _service = new CardService();
  const cards = yield _service.getCards();
  yield put({ type: "CARDS_RECIEVED", cards });
}

export function* createCard(action) {
  const _service = new CardService();
  const newCard = yield _service.addCard(action.card);
  yield put({ type: "GET_CARDS" });
}

export function* deleteCard(action){
  const _service = new CardService();
  const sth = yield _service.removeCard(action.id);
  yield put({ type: "GET_CARDS" });
}

export function* cardWatcher() {
  yield takeLatest("GET_CARDS", getCards);
  yield takeLatest("CREATE_CARD", createCard);
  yield takeLatest("DELETE_CARD", deleteCard);
}
