
import axios from 'axios';

export const GET_RECETAS ="GET_RECETAS"
export const FILTER_DIETS ="FILTER_DIETS"
export const GET_DIETS ="GET_DIETS"
export const ORDER_FILTER ="ORDER_FILTER"
export const ORDER_AZZA = "ORDER_AZZA"
export const GET_NAME_RECIPES = "GET_NAME_RECIPES"
export const POST_RECETAS = "POST_RECETAS"
export const GET_DETAILS ="GET_DETAILS"
export const RELOAD_DETAILS = "RELOAD_DETAILS"
export const ERROR = "ERROR"


export function getrecetas() {
    return async function(dispatch) {
    
      var json = await axios.get("/recipes",{});
      
      return dispatch({
        type: GET_RECETAS,
        payload:json.data

      })
    };
  }
 export function filterdiets(payload){
   
    return({
      type:FILTER_DIETS,
      payload:payload
    })
  }

export function getdiets(){
  return async function(dispatch) {
    
    var info = await axios.get("/diets",{});
    
    return dispatch({
      type: GET_DIETS,
      payload:info.data

    })
  };
}
export function postrecipes(payload){
  return async function(dispatch){
    var post = await axios.post("/recipes",payload)
    return dispatch({
      type: POST_RECETAS,
      payload : post.data
    })
  }
}
export function ordenamientofilt(payload){
  console.log(payload)
   return({
     type:ORDER_FILTER,
     payload:payload
   })
 }

 export function ordenaAZZA(payload){
  console.log(payload)
   return({
     type:ORDER_AZZA,
     payload:payload
   })
 }
 export function getrecetasName(name) {
  return async function(dispatch) {
    try {
      var json = await axios.get("/recipes?name=" + name);
      return dispatch({
        type: GET_NAME_RECIPES,
        payload:json.data
  
      })
    } catch (error) {
     alert("Recipe doesn't exist")
    }
    
    
    
  };
}
export function getdetailid(id){
  return async function(dispatch) {
    try {
      var json = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload:json.data
  
      })
    } catch (error) {
      console.log(error)
    }
    
    
    
  };
}
export function reloaddetail(payload){
  return({
    type:RELOAD_DETAILS,
    payload:payload
  })
}
