import { BaseService } from "./baseService";
import axios from "axios";

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

  update(q, val) {
    return this.connection.update({
      in: this.tableName,
      where: q,
      set: val
    });
  }

  async massAddCurrency(currencies) {
    for (let i = 0; i < currencies.length; i++) {
      const c = currencies[i];
      const existing = await this.update({ name: c.name }, { rate: c.rate });
      if (!existing) {
        this.addCurrency(c);
      }
    }
    return true;
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

  downloadCurrencyData() {
    return axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        return response.data.rates;
      });
  }

  downloadBitcoinData() {
    return axios
      .get("https://blockchain.info/tobtc?currency=USD&value=1")
      .then((response) => {
        return parseFloat(response.data);
      });
  }
}
