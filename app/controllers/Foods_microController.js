const { foods_micros } = require("../models");
const { foods } = require("../models");
const { microorganisms } = require("../models");
const { types } = require("../models");


module.exports = {
    //Listar todas as relaçoes Foods_Micro

    async index(req, res) {
      try {

        const food_micro = await foods_micros.findAll(
          { include: [{model : foods, as: "Food"}, {model : microorganisms, as: "Microorganism"}]}
        );
                  
        return res.send( food_micro );
      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possível listar as foods-micro"
        });
      }
    },
  
    //Listar apenas uma food-micro
    async show(req, res) {
      try {
        const food_micro = await foods_micros.findAll(
        { include: [{model : microorganisms, as: "Microorganism"}],
            where: { id_foods: req.params.id }
        });

        const food = await foods.findOne(
          { include: [{model : types, as: "types"}],
              where: { id: req.params.id }
          });
        
        let ret = { food, microorganisms: [] };
          food_micro.map( fm => ret.microorganisms.push(fm.Microorganism.id, fm.Microorganism.name));
          
        return res.send(ret);
      
      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a food-micro"
        });
      }
    },
  
    //Cadastrar food-micro
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

        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    
    async delete(req, res) {
      //Deletar food-micro
      try {
        const food_micro = await foods_micros.destroy({
          where: { id: req.params.id }
        });

        return res.send({ food_micro });
      } catch (err) {
          
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };