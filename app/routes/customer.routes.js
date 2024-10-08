module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", customers.create);

    // Retrieve all Tutorials
    router.get("/", customers.findAll);

    // Retrieve all published Tutorials
    router.get("/published", customers.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", customers.findOne);

    // Retrieve a single Tutorial with id
    router.get("/phone/:phone", customers.findByMobileNo);

    // // Update a Tutorial with id
    router.put("/:id", customers.update);

    // // Delete a Tutorial with id
    router.delete("/:id", customers.delete);

    // Delete all Tutorials
    router.delete("/", customers.deleteAll);

    app.use('/api/customers', router);
};