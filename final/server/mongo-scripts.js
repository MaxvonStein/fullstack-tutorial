// CONNECT FROM COMMAND LINE:

// LOAD CONSTANTS FROM COMMAN LINE (AT UTILS DIRECTORY):

// (1) First comment out exports and interfaces

load("./constants.ts");

db.listings.find({ model: "RAV4" }).forEach(function (listing) {
  listing.model = "RAV4 Hybrid";
  db.listings.save(listing);
});

db.listings
  .find({ description: { $regex: "Prime" }, model: "Prius" })
  .forEach(function (listing) {
    listing.model = "Prius Prime";
    db.listings.save(listing);
  });

db.listings
  .find({ model: { $ne: { $regex: "Hybrid" } } })
  .map((listing) => print(listing.model));
db.listings
  .find({ model: { $regex: "Fusion" } })
  .map((listing) => print(listing.model));

let newToyota = generations.Toyota.forEach(function (generation) {
  newToyota.push(generation.replace("Highbrid", "Hybrid"));
});

db.listings.find().forEach(function (listing) {
  listing.year = parseInt(listing.year);
  db.listings.save(listing);
});

// ASSIGN A GENERATION VALUE

generations.Toyota.forEach((generation) => {
  let genModel = generation.slice(0, -10);
  let genFirst = parseInt(generation.slice(-9, -5));
  let genLast = parseInt(generation.slice(-4));

  db.listings
    .find({
      make: "Toyota",
      model: genModel,
      year: { $gte: genFirst, $lte: genLast },
    })
    .forEach((listing) => {
      print(generation, listing.year);
      listing.generation = generation;
      db.listings.save(listing);
    });
});

// ASSIGN THE EXAMPLE GENERATION VALUE

Object.keys(sampleModuleGenerations).map((makeKey) => {
  db.listings
    .find({ make: makeKey, module: "module_here" })
    .forEach((listing) => {
      listing.module = "";
    });
});

// ASSIGN A GENERATION VALUE IF ONE DOESN"T EXIST

db.listings.find({ module: { $exists: false } }).forEach((listing) => {
  listing.module = "module_here";
  db.listings.save(listing);
});

// INSERT MODULE DOCUMENTS

Object.keys(moduleGenerations).map((makeKey) => {
  print(makeKey);
});

Object.keys(moduleGenerations).map((makeKey) => {
  moduleGenerations[makeKey].forEach((module) => {
    let moduleDocument = {
      ...module,
      make: makeKey,
    };
    print(moduleDocument.name);
    db.modules.insert(moduleDocument);
  });
});

db.listings.find({}).forEach((listing) => {
  let { make, model, year } = listing;
  print("listing: ", make, model, year);
  if (make == "Hyundai") {
    print("Hyundai");
    const module = db.modules.find({
      make: "Kia",
      models: { $in: [model] },
      firstYear: { $lte: year },
      lastYear: { $gte: year },
    })[0];
  } else {
    const module = db.modules.find({
      make: make,
      models: { $in: [model] },
      firstYear: { $lte: year },
      lastYear: { $gte: year },
    })[0];
  }

  listing.moduleId = module._id;
  db.listings.save(listing);
});

db.modules.find({ model: { $type: "string" } }).forEach((module) => {
  print(module.model);
  module.models = [module.model];
  db.modules.save(module);
});

db.listings.updateMany({ model: "MKZ" }, { $set: { model: "MKZ Hybrid" } });

// UNSET LISTING ATTRIBUTE

db.listings.updateMany({}, { $unset: { module: "" } });
