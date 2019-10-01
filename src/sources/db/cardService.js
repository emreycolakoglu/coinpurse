import { BaseService } from "./baseService";

export class CardService extends BaseService {
  constructor() {
    super();
    this.tableName = "Card";
  }

  getCards() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addCard(card) {
    return this.connection.insert({
      into: this.tableName,
      values: [card],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getCardById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removeCard(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updateCardById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }
}
