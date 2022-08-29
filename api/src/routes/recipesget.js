const { Router } = require('express');
const { getall } = require('../Cotrollers/Controllers');
const {Recipe, Typediet} = require('../db')
const router = Router();

router.get('/',async (req,res)=>{
    const {name} = req.query;
    const allrecipes = await getall()
   
    if(name){
        const filter = await allrecipes.filter(e=> e.title.toLowerCase().includes(name.toLowerCase()))
        filter.length ? res.status(200).send(filter) : res.status(400).send('No se encontró dicha Receta')
    }else{
        res.status(200).send(allrecipes)
    }
    
   


}),    
       

module.exports = router;