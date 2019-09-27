import { applyMiddleware } from "redux";

const storage = (store) => (next) => (action) => {
  next(action);
  /*const data = store.getState();
  if (data.student) {
    StorageAdapter.set(
      constants.storageNames.user,
      data.student,
      "localStorage"
    );
  }
  else{
    StorageAdapter.remove(constants.storageNames.user, "localStorage");
  }*/
};

const middleware = applyMiddleware(storage);

export default middleware;
