import { FILTER_DIETS, GET_DIETS, GET_RECETAS,ORDER_AZZA,ORDER_FILTER,GET_NAME_RECIPES,POST_RECETAS,GET_DETAILS,RELOAD_DETAILS} from "../Actions/actions";



const initialState={
    recipes : [],
    allrecipes: [],
    typediet :[],
    getdetails : [],

}

export default function rootReducer (state = initialState,action){
    switch (action.type) {
        case GET_RECETAS:
            return({
                ...state,
                recipes : action.payload,
                allrecipes : action.payload
            })
        

        case GET_DIETS:
            return({
                ...state,
                typediet:action.payload
            })
        case FILTER_DIETS:
               
                const allrecipes = state.allrecipes
                function fordiets(){
                    let newArray = [];
                    for(let key in allrecipes) {
                        allrecipes[key].diet.map(e => {
                            if(e === action.payload){
                                newArray.push(allrecipes[key]);
                            }
                        })
                    }
                    return newArray;
                }
                console.log(allrecipes)
                const filtrado = action.payload === "All Diets"? allrecipes:fordiets()  
                
    
                return({
                    ...state,
                    recipes:filtrado
                })     
        case ORDER_FILTER:
        
            
           
          
            const ordenado = action.payload==="more"?
            state.recipes.sort(function(a,b){if(a.health_score > b.health_score){return -1}if(b.health_score > a.health_score){return +1}return 0}):
            state.recipes.sort(function(a,b){if(b.health_score < a.health_score){return +1}if(a.health_score < b.health_score){return -1}return 0})

            console.log(ordenado)
            return({
               ...state,
               recipes:ordenado
            })
        case ORDER_AZZA:
            const ordenados =action.payload === "AZ"?
            state.recipes.sort(function(a,b){if(a.title < b.title){return -1}if(b.title < a.title){return +1}return 0}):
            state.recipes.sort(function(a,b){if(a.title > b.title){return -1}if(b.title > a.title){return +1}return 0})
            
            return({
                ...state,
                recipes:ordenados
            })
        case GET_NAME_RECIPES:
            return({
                ...state,
                recipes:action.payload
            })
        case POST_RECETAS:
            return({
                ...state
            })
        case GET_DETAILS:
            return({
                ...state,
                getdetails: action.payload
            })
        case RELOAD_DETAILS:
            return({
                ...state,
                getdetails: action.payload
            })
        
        default:
            return state
            
    }
}