const {Recipe, Typediet} = require('../db')
const {APIKEY} = process.env
const axios = require("axios")

 const getapidata = async () =>{
    const apidiet =  await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
    const apidata = await apidiet.data.results.map(e=>{
        return{
            id:e.id,
            title:e.title,
            imagen : e.image,
            resumen_plato:e.summary,
            diet: e.diets,
            health_score:e.healthScore,
            steps:e.analyzedInstructions[0]?.steps.map( (e) =>{
                return{
                    number:e.number,
                    step:e.step
                }
            })
        }
    })
    return apidata
}

const getdbdata = async () =>{
    const apidb = await Recipe.findAll({
        include:{
            model:Typediet,
            attributes : ['diet'],
            through : {
                attributes:[]
            }
        } 

    })
    return apidb
}
 const getall = async () =>{
    const api = await getapidata();
    const db = await getdbdata();
    const todos = api.concat(db)
    return todos
}
const diet = [
    "gluten free",
    "lacto ovo vegetarian",
    "vegan",
    "dairy free",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "ketogenic",
    "fodmap friendly"
]
module.exports = {
    getall,
    getapidata,
    getdbdata,
    diet
}