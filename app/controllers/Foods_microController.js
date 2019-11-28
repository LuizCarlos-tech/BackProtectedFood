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

        return res.status(400).send({
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

        return res.status(400).send({
          error: "Erro",
          description: "Não foi possivel listar a food-micro"
        });
      }
    },
  
    //Cadastrar food-micro
    async create(idFood, ids, res) {

      ids.map(async id => {
        const x = await foods_micros.create({ 
          id_foods: idFood,
          id_micro: id
        })
        .then(() => console.log('ok'))
        .catch(err => res.status(400).send(err));
      });
      
      res.status(200).send({ "status": "ok" });
    },
  
    
    async delete(req, res) {
      //Deletar food-micro
      try {
        const food_micro = await foods_micros.destroy({
          where: { id: req.params.id }
        });

        return res.send({ food_micro });
      } catch (err) {
          
        return res.status(400).send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };