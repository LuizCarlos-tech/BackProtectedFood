const { foods } = require("../models");
const { categories } = require("../models");
const { types } = require("../models");

module.exports = {
   
    //Listar todas comidas
    async index(req, res) {
      try {
        const food = await foods.findAll({
          include: [{model : categories, as: "categories"}, {model : types, as:"types"}]
        }
       );
        return res.send({ food });
      } catch (error) {
        console.log(error);
        return res.send({
          error: "Erro",
          deion: "Não foi possível listar as comidas"
        });
      }
    },
  
    //Listar apenas uma comidas
    async show(req, res) {
      try {
        const food = await foods.findAll(
          { include: [{model : categories, as: "categories"}, {model : types, as:"types"}],
          where: { id_category: req.params.id }
        }
        );
        return res.send(food);
      } catch (error) {
        return res.send({
          error: "Erro",
          deion: "Não foi possivel listar a comida"
        });
      }
    },
  
    //Cadastrar comidas
    async create(req, res) {
      const { name, id_type, id_category} = req.body;
      //console.log(name, id_type, id_category);
      
      if (!name || !id_type || !id_category)
      //console.log(error);
        return res.send({
          error: "Erro ao Cadastrar",
          deion: "Falha no cadastro."
        });
  
      const newFood = { name, id_type, id_category};
        
      try {
        const food = await foods.create(newFood);
        return res.json(food);
      } catch (err) {
        console.log(err);
        return res.json({
          error: "Erro ao Cadastrar",
          deion: "Erro no Servidor.",
          err
        });
      }
    },


    //Atualização de comidas
    async update(req, res) {  
      const { name, id_type, id_category } = req.body;
      console.log(name, id_type, id_category);
      
      if (!name || !id_type || !id_category)
        return res.send({
          error: "Erro ao Atualizar",
          deion: "Falha na atualização"
        });
  
      try {
        const food = await foods.update(
          {
            name,
            id_type,
            id_category,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );
        return res.send({ food });
      } catch (err) {
        return res.send({
          error: "Erro ao Atualizar",
          deion: "Erro no Servidor",
          err
        });
      }
    },
  

    //Deletar comidas
    async delete(req, res) {
      try {
        const food = await foods.destroy({
          where: { id: req.params.id }
        });
        return res.send({ food });
      } catch (err) {
        return res.send({
          error: "Erro ao Deletar",
          deion: "Erro no Servidor",
          err
        });
      }
    }
  };