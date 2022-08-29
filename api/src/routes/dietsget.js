const { Router } = require('express');
const {Recipe, Typediet} = require('../db')
const router = Router();
const {APIKEY} = process.env
const axios = require("axios")
const { diet } = require('../Cotrollers/Controllers')

router.get('/',async (req,res)=>{
   
    
    
    diet.forEach(e =>{
        
        if(e !== undefined){
            Typediet.findOrCreate({
                where:{
                    diet:e
                }
            })

        }
        
    })
    
    // dieteach.forEach(el => {
    //     Typediet.findOrCreate({
    //         where:{
    //             diet:el
    //         }
    //     })
    // });
   const alldiets = await Typediet.findAll()
   res.status(200).send(alldiets)


 })
 module.exports = router