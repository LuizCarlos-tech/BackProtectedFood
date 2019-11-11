const { foods_micros } = require("../models");
const { foods } = require("../models");
const { microorganisms } = require("../models");

module.exports = {
    //Listar todas categorias

    async index(req, res) {
      try {
        const food_micro = await foods_micros.findAll();
        return res.send({ food_micro });
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
        const food_micro = await foods_micros.findAll({
          where: { id_foods: req.params.id }
        });

        const keyFoods = req.params.id;
        console.log(keyFoods);
        
        const food = await foods.findOne({
          where: { id: keyFoods }
         });
        
        const ids = food_micro.map(id => id.id_micro);
         console.log(ids);
     
        const value = ids.map(async id => await microorganisms.findAll({
          where: {id}
        })
        );
        console.log(value);
        
        // const micro = { food: food.dataValues, microorganism: microorganism.dataValues}
        
        return res.send(food_micro);
      } catch (error) {
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a categoria"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res) {
      const { id_foods, id_micro } = req.body;
      
      console.log(id_foods, id_micro);
      
      if (!id_micro || !id_foods)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
        
      const newFoodsMicro = { id_foods, id_micro };
        
      try {
        const food_micro = await foods_micros.create(newFoodsMicro);
        return res.json(food_micro);
      } catch (err) {
        console.log(err);
        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    
    async delete(req, res) {
      //Deletar categoria
      try {
        const food_micro = await foods_micros.destroy({
          where: { id: req.params.id }
        });
        return res.send({ food_micro });
      } catch (err) {
          console.log(err);
          
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };