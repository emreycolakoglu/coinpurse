import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { AssetService } from "../../sources/db/assetService";

export function* getAssets() {
  const _service = new AssetService();
  const assets = yield _service.getAssets();
  yield put({ type: "ASSETS_RECIEVED", assets });
}

export function* createAsset(asset) {
  const _service = new AssetService();
  const newAsset = yield _service.addAsset(asset);
  yield put({ type: "GET_ASSETS" });
}

function* actionWatcher() {
  yield takeLatest("GET_ASSETS", getAssets);
  yield takeLatest("CREATE_ASSET", createAsset);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
