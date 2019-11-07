/* Rota de Teste */
const express = require("express");
const router = express.Router();

/* Controller de Categoria */
const CategorieController = require("./../app/controllers/CategoryController");
router.get("/category/all", CategorieController.index);
router.get("/category/show/:id", CategorieController.show);
router.post("/category/create", CategorieController.create);
router.put("/category/update/:id", CategorieController.update);
router.delete("/category/delete/:id", CategorieController.delete);

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

module.exports = router;
