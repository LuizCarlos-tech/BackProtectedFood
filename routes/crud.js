/* Rota de Teste */
const express = require("express");
const router = express.Router();

/* Controller de Categoria */
const CategorieController = require("./../app/controllers/CategoryController");
router.get("/category/all", CategorieController.index);
router.get("/category/show/:id", CategorieController.show);
router.post("/category/create", CategorieController.create);
router.post("/category/update/:id", CategorieController.update);
router.delete("/category/delete/:id", CategorieController.delete);

/* Controller de Types */
const TypeController = require("./../app/controllers/TypeController");
router.get("/type/all", TypeController.index);
router.get("/type/show/:id", TypeController.show);
router.post("/type/create", TypeController.create);
router.post("/type/update/:id", TypeController.update);
router.delete("/type/delete/:id", TypeController.delete);


module.exports = router;
