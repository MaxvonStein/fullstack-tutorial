const mongodb = require("mongodb");
const { MongoDataSource } = require("apollo-datasource-mongodb");
// using apollo-data.. 0.5.2

class ListingAPI extends MongoDataSource {
  async getListings() {
    return await this.collection.find().toArray();
  }
  async getFilteredListings(findQuery) {
    // batteryFilter eg. {model: ["Camry", "Highlander"]}
    return await this.findByFields(findQuery);
  }
  async getListingById({ listingId }) {
    return await this.findOneById(listingId);
  }
}

module.exports = ListingAPI;
