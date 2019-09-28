import { BaseService } from "./baseService";

export class CurrencyService extends BaseService {
  constructor() {
    super();
    this.tableName = "Currency";
  }

  getCurrencies() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addCurrency(currency) {
    return this.connection.insert({
      into: this.tableName,
      values: [currency],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getCurrencyById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removeCurrency(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updateCurrencyById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }
}
