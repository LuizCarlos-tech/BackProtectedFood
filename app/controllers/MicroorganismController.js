const { microorganisms } = require("../models");
const { diseases } = require("../models");

module.exports = {
    //Listar todas categorias

    async index(req, res) {
      try {
        const microorganism = await microorganisms.findAll(
          { include: [{model : diseases, as: "diseases"}]}
        );
        return res.send({ microorganism });

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
        const microorganism = await microorganisms.findOne(
          { include: [{model : diseases, as: "diseases"}],
          where: { id: req.params.id }
        }
        );
        
        return res.send(microorganism);
        
      } catch (error) {
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a categoria"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res) {
      const { name, description, url_image } = req.body;
      
      
      if (!name || !description || !url_image)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newMicroorganism = { name, description, url_image };
        
      try {
        const microorganism = await microorganisms.create(newMicroorganism);
        return res.json(microorganism);
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
      const { name, id_category } = req.body;
      console.log(name,id_category);
      
      if (!name || !id_category)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const microorganism = await microorganisms.update(
          {
            name,
            description,
            url_image,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );
        return res.send({ microorganism });
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
        const microorganism = await microorganisms.destroy({
          where: { id: req.params.id }
        });
        return res.send({ microorganism });
      } catch (err) {
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };