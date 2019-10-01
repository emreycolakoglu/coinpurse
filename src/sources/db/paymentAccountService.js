import { BaseService } from "./baseService";

export class PaymentAccountService extends BaseService {
  constructor() {
    super();
    this.tableName = "PaymentAccount";
  }

  getPaymentAccounts() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addPaymentAccount(pa) {
    return this.connection.insert({
      into: this.tableName,
      values: [pa],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getPaymentAccountById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removePaymentAccount(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updatePaymentAccountById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }
}
