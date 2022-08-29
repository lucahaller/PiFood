const { Router } = require('express');
const {Recipe, Typediet} = require('../db')
const router = Router();


router.post('/', async(req,res)=>{
    const {title,resumen_plato,health_score,imagen,steps,createInDb,diet} = req.body;
    
    const receta = await Recipe.create({
        title,
        resumen_plato,
        health_score,
        steps,
        imagen,
        createInDb})
     const dietreceta = await Typediet.findAll({
         where:{
              diet:diet
         }
     })
     receta.addTypediet(dietreceta)
     res.status(200).json('Personaje Creado')
    
    
 })

 module.exports = router;