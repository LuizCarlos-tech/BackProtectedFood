/* Rota de Teste */
const express = require("express");
const router = express.Router();

const SymptomsController = require("./../app/controllers/SymptomsController");
const MicroorganismController = require("./../app/controllers/MicroorganismController");
const TypeController = require("./../app/controllers/TypeController");
const Foods_microController = require("./../app/controllers/Foods_microController");
const FoodController = require("./../app/controllers/FoodController");
const Diseases_symptomsController = require("./../app/controllers/Diseases_symptomsController");
const DiseaseController = require("../app/controllers/DiseaseController");
const UserController = require("./../app/controllers/UserController");

//-----------------------------------------Doenças---------------------------------------------------//
router.get("/diseases/all", Diseases_symptomsController.index);
router.get("/diseases/show/:id", Diseases_symptomsController.show);
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
);
router.put("/diseases/update/:id", async (req, res) => { 
    await DiseaseController.update(req.params.id, req.body, res)
    .then(async id => {
        await SymptomsController.create(id, req.body.symptoms, res)
        .then(async ([id, ids]) => {
            await Diseases_symptomsController.create(id, ids ,res)
            .then(status => res.send({ "status": "ok" }))
            .catch(err => res.send({ "error": err }))
        })
        .catch(err => res.send({ "error": err}));
    })
    .catch(err => res.send({"error": err})); 
}
);
router.delete("/diseases/delete/:id", DiseaseController.delete);
//-----------------------------------------------------------------------------------------------
//----------------------------------Foods---------------------------------------------------

router.get("/food/showType/:name", FoodController.showType);
router.post("/food/create", async (req, res) => {
    await FoodController.create(req.body, res)
    .then(async id => {
        await Foods_microController.create(id, req.body.microorganisms, res)
        .then(status => res.send({ "status": "ok" }))
        .catch(err => res.send({ "error": err }))
    })
    .catch(err => res.send({ "error": err }))
});

router.get("/foods/all", Foods_microController.index);
router.put("/food/update/:id", async (req, res) => {
    await FoodController.update(req.params.id ,req.body, res)
    .then(async id => {
        await Foods_microController.create(id, req.body.microorganisms, res)
        .then(status => res.send({ "status": "ok" }))
        .catch(err => res.send({ "error": err }))
    })
    .catch(err => res.send({ "error": err }))
});
router.delete("/food/delete/:id", FoodController.delete);



/* Controller de Microorganism */
router.get("/microorganism/all", MicroorganismController.index);
router.get("/microorganism/show/:id", MicroorganismController.show);
router.post("/microorganism/create", MicroorganismController.create);
router.put("/microorganism/update/:id", MicroorganismController.update);
router.delete("/microorganism/delete/:id", MicroorganismController.delete);


/* Controller de FoodsMicro */
router.get("/foods-micro/all", Foods_microController.index);
router.get("/foods-micro/show/:id", Foods_microController.show);
router.post("/foods-micro/create", Foods_microController.create);
router.delete("/foods-micro/delete/:id", Foods_microController.delete);


/* Controller de Foods */
router.get("/food/all", FoodController.index);
router.get("/food/showId/:id", FoodController.showId);
router.get("/food/showName/:name", FoodController.showName);



/* Controller de Users */
router.post("/auth/google/create", UserController.createG);
router.post("/auth/facebook/create", UserController.createF);
router.delete("/auth/facebook/delete", UserController.deleteF);
router.delete("/auth/google/delete", UserController.deleteG);

module.exports = router;
