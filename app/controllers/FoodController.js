const { foods } = require("../models");
const { types } = require("../models");

module.exports = {
   
    //Listar todas comidas
    async index(req, res) {
      try {
        const food = await foods.findAll({
          include: [{model : types, as:"types"}]
        }
       );

        return res.send({ food });
      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possível listar as comidas"
        });
      }
    },
  
    //Listar apenas uma comidas
    async showId(req, res) {
      try {
        const food = await foods.findAll(
          { include: [{model : types, as:"types"}],
          where: { id: req.params.id }
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
    //Listar apenas uma comida pelo name
    async showName(req, res) {
      try {
        const food = await foods.findAll(
          { include: [{model : types, as:"types"}],
          where: { name: req.params.name }
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

       //Listar apenas uma comida pelo type
       async showType(req, res) {
        try {
          const food = await foods.findAll(
            { include: [{model : types, as:"types"}],
            where: { id_type: req.params.id_type }
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
    async create(food, res) {
      const { name, id_type, url_image, control_measure} = food;
  
      if (!name || !id_type || !url_image || !control_measure)
        
      return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newFood = { name, id_type, url_image, control_measure};
        
      try {
        const verifica = await foods.findOne({
          where: { name }
        });
  
        if(verifica == null){
          const food = await foods.create(newFood);
        return  food.id;
        }else{
            return res.json("Comida já existe");
        }
      } catch (err) {

        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },


    //Atualização de comidas
    async update(req, res) {  
      const { name, id_type, url_image, control_measure } = req.body;
      
      if (!name || !id_type || !url_image || !control_measure)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const food = await foods.update(
          {
            name,
            id_type,
            url_image,
            control_measure,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );

        return res.send({ food });
      } catch (err) {

        return res.send({
          error: "Erro ao Atualizar",
          description: "Erro no Servidor",
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