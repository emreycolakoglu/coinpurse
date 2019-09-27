import { BaseService } from "./baseService";

export class AssetService extends BaseService {
  constructor() {
    super();
    this.tableName = "Asset";
  }

  getAssets() {
    return this.connection.select({
      from: this.tableName
    });
  }

  addAsset(asset) {
    return this.connection.insert({
      into: this.tableName,
      values: [asset],
      return: true // since studentid is autoincrement field and we need id,
      // so we are making return true which will return the whole data inserted.
    });
  }

  getAssetById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  removeAsset(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        id: id
      }
    });
  }

  updateAssetById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    });
  }
}
