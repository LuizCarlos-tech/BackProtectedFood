/* Rota de Teste */
const express = require("express");
const router = express.Router();
const SymptomsController = require("./../app/controllers/SymptomsController");


/* Controller de Microorganism */
const MicroorganismController = require("./../app/controllers/MicroorganismController");
router.get("/microorganism/all", MicroorganismController.index);
router.get("/microorganism/show/:id", MicroorganismController.show);
router.post("/microorganism/create", MicroorganismController.create);
router.put("/microorganism/update/:id", MicroorganismController.update);
router.delete("/microorganism/delete/:id", MicroorganismController.delete);

/* Controller de Types */
const TypeController = require("./../app/controllers/TypeController");
router.get("/type/all", TypeController.index);
router.get("/type/showId/:id", TypeController.showId);
router.get("/type/showType/:type", TypeController.showType);
router.post("/type/create", TypeController.create);
router.put("/type/update/:id", TypeController.update);
router.delete("/type/delete/:id", TypeController.delete);

/* Controller de FoodsMicro */
const Foods_microController = require("./../app/controllers/Foods_microController");
router.get("/foods-micro/all", Foods_microController.index);
router.get("/foods-micro/show/:id", Foods_microController.show);
router.post("/foods-micro/create", Foods_microController.create);
router.delete("/foods-micro/delete/:id", Foods_microController.delete);

/* Controller de DiseasesSymptoms */
const Diseases_symptomsController = require("./../app/controllers/Diseases_symptomsController");
router.get("/diseases-symptoms/all", Diseases_symptomsController.index);
router.get("/diseases-symptoms/show/:id", Diseases_symptomsController.show);
router.post("/diseases-symptoms/create", Diseases_symptomsController.create);
router.delete("/diseases-symptoms/delete/:id", Diseases_symptomsController.delete);

/* Controller de Foods */
const FoodController = require("./../app/controllers/FoodController");
router.get("/food/all", FoodController.index);
router.get("/food/showId/:id", FoodController.showId);
router.get("/food/showName/:name", FoodController.showName);
router.get("/food/showType/:id_type", FoodController.showType);

router.post("/food/create", async (req, res) => {
    await FoodController.create(req.body, res)
    .then(async id => {
        await Foods_microController.create(id, req.body.microorganisms, res)
    })
}
 );


router.put("/food/update/:id", FoodController.update);
router.delete("/food/delete/:id", FoodController.delete);

/* Controller de Doenças */
const DiseaseController = require("../app/controllers/DiseaseController");
router.get("/diseases/all", DiseaseController.index);
router.get("/diseases/show/:id", DiseaseController.show);
router.post("/diseases/create",
    async (req, res) => {
        
        await DiseaseController.create(req.body, res)
        .then(async id => {
            await SymptomsController.create(id, req.body.symptoms, res)
            .then(async ([id, ids]) => {
                await Diseases_symptomsController.create(id, ids, res)
                .then(status => res.send({ "status": "ok" }))
                .catch(err => res.send({ "error": err }))
            })
            .catch(err => res.send({ "error": err }))
        })
        .catch(err => res.send({"error": err}));
    }
    // DiseaseController.create, 
    // SymptomsController.create,
    // Diseases_symptomsController.create
);
router.put("/diseases/update/:id", DiseaseController.update);
router.delete("/diseases/delete/:id", DiseaseController.delete);

/* Controller de Sintomas */
router.get("/symptoms/all", SymptomsController.index);
router.get("/symptoms/show/:id", SymptomsController.show);
router.post("/symptoms/create", SymptomsController.create);
router.put("/symptoms/update/:id", SymptomsController.update);
router.delete("/symptoms/delete/:id", SymptomsController.delete);

/* Controller de Users */
const UserController = require("./../app/controllers/UserController");
router.post("/auth/google/create", UserController.createG);
router.post("/auth/facebook/create", UserController.createF);
router.delete("/auth/facebook/delete", UserController.deleteF);
router.delete("/auth/google/delete", UserController.deleteG);

module.exports = router;
