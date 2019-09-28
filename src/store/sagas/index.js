import { assetWatcher } from "./assetSaga";
import { debtWatcher } from "./debtSaga";
import { currencyWatcher } from "./currencySaga";

export default function* rootSaga() {
  yield all([assetWatcher(), debtWatcher(), currencyWatcher()]);
}
