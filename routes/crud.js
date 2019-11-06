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

module.exports = router;
