import { BaseService } from "./baseService";

export class IncomeService extends BaseService {
  constructor() {
    super();
    this.tableName = "Income";
  }

  getIncomes() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addIncome(income) {
    return this.connection.insert({
      into: this.tableName,
      values: [income],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getIncomeById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removeIncome(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updateIncomeById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }

  findIncomes(query) {
    return this.connection.select({
      from: this.tableName,
      where: query
    });
  }
}
