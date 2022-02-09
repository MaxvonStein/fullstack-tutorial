const mongodb = require("mongodb");
const { MongoDataSource } = require("apollo-datasource-mongodb");

class ListingAPI extends MongoDataSource {
  async getListings() {
    return await this.collection.find().toArray();
  }
}

module.exports = ListingAPI;
