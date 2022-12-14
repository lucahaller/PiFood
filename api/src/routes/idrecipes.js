const { Router } = require('express');
const { getall } = require('../Cotrollers/Controllers');
const {Recipe, Typediet} = require('../db')
const router = Router();

router.get('/:id', async(req,res)=>{
    const {id} = req.params
    
    const alldata = await getall()
    
    if(id){
        const filterid = await alldata.filter(e=>e.id == id)
        let filter = filterid[0]
        filterid.length?res.status(200).send(filter):res.status(404).send('No se encontrĂ³ dicha receta')
    }else{
        res.status(404).send('Error receta inexistente')
    }
})

module.exports = router;