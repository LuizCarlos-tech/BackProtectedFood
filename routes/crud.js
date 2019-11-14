/* Rota de Teste */
const express = require("express");
const router = express.Router();

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
router.get("/type/show/:id", TypeController.show);
router.post("/type/create", TypeController.create);
router.put("/type/update/:id", TypeController.update);
router.delete("/type/delete/:id", TypeController.delete);

/* Controller de FoodsMicro */
const Foods_microController = require("./../app/controllers/Foods_microController");
router.get("/foods-micro/all", Foods_microController.index);
router.get("/foods-micro/show/:id", Foods_microController.show);
router.post("/foods-micro/create", Foods_microController.create);
router.delete("/foods-micro/delete/:id", Foods_microController.delete);

/* Controller de Foods */
const FoodController = require("./../app/controllers/FoodController");
router.get("/food/all", FoodController.index);
router.get("/food/show/:id", FoodController.show);
router.post("/food/create", FoodController.create);
router.put("/food/update/:id", FoodController.update);
router.delete("/food/delete/:id", FoodController.delete);

/* Controller de Doenças */
const DiseaseController = require("./../app/controllers/DisiaseController");
router.get("/diseases/all", DiseaseController.index);
router.get("/diseases/show/:id", DiseaseController.show);
router.post("/diseases/create", DiseaseController.create);
router.put("/diseases/update/:id", DiseaseController.update);
router.delete("/diseases/delete/:id", DiseaseController.delete);

/* Controller de Sintomas */
const SymptomsController = require("./../app/controllers/SymptomsController");
router.get("/symptoms/all", SymptomsController.index);
router.get("/symptoms/show/:id", SymptomsController.show);
router.post("/symptoms/create", SymptomsController.create);
router.put("/symptoms/update/:id", SymptomsController.update);
router.delete("/symptoms/delete/:id", SymptomsController.delete);

module.exports = router;
