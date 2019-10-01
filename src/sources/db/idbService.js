import * as JsStore from "jsstore";
import { IDataBase, DATA_TYPE, ITable } from "jsstore";

const getWorkerPath = () => {
  if (process.env.NODE_ENV === "development") {
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
  } else {
    return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
  }
};

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.
const workerPath = getWorkerPath();
export const idbCon = new JsStore.Instance(new Worker(workerPath));
export const dbname = "CoinPurse";

const version = parseInt((process.env.VERSION || "0.0.1").replace(/\./g, ""));

const getDatabase = () => {
  const tblPaymentAccount = {
    name: "PaymentAccount",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      balance: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      icon: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      currencyId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const tblCard = {
    name: "Card",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      balance: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      icon: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      currencyId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const tblAsset = {
    name: "Asset",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      balance: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      icon: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      currencyId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const tblDebt = {
    name: "Debt",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      balance: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      icon: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      currencyId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const tblCurrency = {
    name: "Currency",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      rate: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const tblIncome = {
    name: "Income",
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      description: {
        dataType: DATA_TYPE.String
      },
      amount: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      date: {
        notNull: true,
        default: new Date(),
        dataType: DATA_TYPE.DateTime
      },
      incomeCategoryId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      },
      paymentAccountId: {
        notNull: true,
        dataType: DATA_TYPE.Number
      }
    },
    version
  };
  const dataBase = {
    name: dbname,
    tables: [
      tblPaymentAccount,
      tblCard,
      tblAsset,
      tblDebt,
      tblCurrency,
      tblIncome
    ]
  };
  return dataBase;
};

export const initJsStore = () => {
  try {
    const dataBase = getDatabase();
    idbCon.initDb(dataBase);
  } catch (ex) {
    console.error(ex);
  }
};
