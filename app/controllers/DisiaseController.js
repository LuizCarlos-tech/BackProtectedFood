const { diseases } = require("../models");

module.exports = {
    //Listar todas categorias

    async index(req, res) {
      try {
        const disease = await diseases.findAll();
        return res.send({ disease });
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
        const disease = await diseases.findOne({
          where: { id: req.params.id }
        });
        return res.send({ disease });
      } catch (error) {
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a categoria"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res) {
      const { name, id_micro} = req.body;
      console.log(name, id_micro);
      
      if (!name || !id_micro)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newDisease = { name, id_micro };
        
      try {
        const disease = await diseases.create(newDisease);
        return res.json(disease);
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
      const { name, id_micro } = req.body;
      console.log(name,id_micro);
      
      if (!name || !id_micro)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const disease = await diseases.update(
          {
            name,
            id_micro,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );
        return res.send({ disease });
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
        const disease = await diseases.destroy({
          where: { id: req.params.id }
        });
        return res.send({ disease });
      } catch (err) {
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };