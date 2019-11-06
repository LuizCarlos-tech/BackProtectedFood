const { categories } = require("../models");

module.exports = {
    //Listar todas categorias

    async index(req, res) {
      try {
        const category = await categories.findAll();
        return res.send({ category });
      } catch (error) {
        console.log(error);
        return res.send({
          error: "Erro",
          description: "Não foi possível listar as categorias"
        });
      }
    },
  
    //Listar apenas uma categoria
    async show(req, res) {
      try {
        const category = await categories.findOne({
          where: { id: req.params.id }
        });
        return res.send({ category });
      } catch (error) {
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a categoria"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res) {
      const { name, descripition } = req.body;
      console.log(name, descripition);
      
      if (!name || !descripition)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newCategorie = { name, descripition };
        
      try {
        const category = await categories.create(newCategorie);
        return res.json(category);
      } catch (err) {
        console.log(err);
        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    async update(req, res) {
      //Atualização de Categoria
      const { name, descripition } = req.body;
      console.log(name,descripition);
      
      if (!name || !descripition)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const category = await categories.update(
          {
            name,
            descripition,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );
        return res.send({ category });
      } catch (err) {
        return res.send({
          error: "Erro ao Atualizar",
          description: "Erro no Servidor",
          err
        });
      }
    },
  
    async delete(req, res) {
      //Deletar categoria
      try {
        const category = await categories.destroy({
          where: { id: req.params.id }
        });
        return res.send({ category });
      } catch (err) {
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };