import { BaseService } from "./baseService";

export class DebtService extends BaseService {
  constructor() {
    super();
    this.tableName = "Debt";
  }

  getDebts() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addDebt(debt) {
    return this.connection.insert({
      into: this.tableName,
      values: [debt],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getDebtById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removeDebt(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updateDebtById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }
}
