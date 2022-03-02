const mongodb = require("mongodb");
const { MongoDataSource } = require("apollo-datasource-mongodb");
// using apollo-data.. 0.5.2

class ModuleAPI extends MongoDataSource {
  async getModules() {
    return await this.collection.find().toArray();
  }
  async getModuleById({ moduleId }) {
    return await this.findOneById(moduleId);
  }
}

module.exports = ModuleAPI;
