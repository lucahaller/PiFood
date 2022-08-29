import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getdiets, postrecipes} from "../Actions/actions";
import { Link, useHistory } from "react-router-dom";
import "./CreateRecipes.css"



export default function CreateRecipes(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [input,setinput] = useState({
        title:"",
        resumen_plato: "",
        health_score: "",
        steps:"",
        imagen:"",
        diet:[]

    })
    const [errors,setErrors] = useState({})
    const diets =  useSelector((state)=>state.typediet)



    useEffect(()=>{
        dispatch(getdiets())

    },[])

    function handlechangue(e){
        setinput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function reload(){
        window.location.href = window.location.href;
        
    }
    function select(e){
        setinput({
            ...input,
            diet:[...input.diet,e.target.value]
        })
    }
    function post(e){
        e.preventDefault()
        if(errors.title || errors.resumen_plato || errors.health_score || errors.steps || errors.diet || errors.imagen || input.title === "" 
         || input.health_score === "" || input.diet.length === 0 || input.imagen === "" || input.resumen_plato === "" || input.steps === "" ){
            alert(" Error: Receta no creada, porfavor rellene los campos especificados y/o corriga los errores")
            reload()
        }else{
            dispatch(postrecipes(input))
         alert("Receta creada con éxito!")
         setinput({
            title:"",
            resumen_plato: "",
            health_score: "",
            steps:"",
            imagen:"",
            diet:[]
           })
         history("/home")
        }
       

       console(input.diet)
    }
    function deletediet(e){
        setinput({
            ...input,
            diet: input.diet.filter(d=>d !== e)
        })
       
    }
    function validate(input){
        let errors = {}
        if(!input.title){
            errors.title = "Especificar título de receta"
        }else if(!input.resumen_plato){
            errors.resumen_plato = "Redactar un resumen para la receta"
        }else if(input.health_score < 0 || input.health_score > 100 || !input.health_score){
            errors.health_score = "Declarar un valor entre 0 y 100"
        }else if(!input.steps){
            errors.steps = "Redactar los pasos a seguir!"
        }else if(!input.diet){
            errors.diet = "Especificar la dieta del plato"
        }else if(!input.imagen){
            errors.imagen = "Inserte dirrección de imágen"
        }
        return errors
    }
    return(
        <div className="CreateBody">
            <Link to = "/home">
                <button>Volver</button>
            </Link>
            <h1>Crea tu receta!</h1>
            <form onSubmit={e=>post(e)} className="formulario">
                <div>
                    <label className="titlecreate">Title</label>
                        <input type="text" value={input.title} name = "title" onChange={e=>handlechangue(e)} className="inputtitle"/>
                    {errors.title &&(
                        <p>{errors.title}</p>
                    )}
                </div>
                <div>
                    <label className="titlecreate">Summary</label>
                        <input type="text" value={input.resumen_plato} name = "resumen_plato" onChange={e=>handlechangue(e)} className="inputsummary"/>
                    {errors.resumen_plato&&(
                        <p>{errors.resumen_plato}</p>
                    )}
                </div>
                <div>
                    <label className="titlecreate">Healthscore</label>
                        <input type="number" value={input.health_score} name = "health_score" onChange={e=>handlechangue(e)} placeholder="70" className="inputfor"/>
                    {errors.health_score&&(
                        <p>{errors.health_score}</p>
                    )}
                </div>
                <div>
                    <label className="titlecreate">Steps</label>
                        <input type="text" value={input.steps} name = "steps" onChange={e=>handlechangue(e)} className="inputsteps"/>
                    {errors.steps&&(
                        <p>{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label className="titlecreate">Imagen</label>
                        <input type="text" value={input.imagen} name = "imagen" placeholder="Https://.." onChange={e=>handlechangue(e)} className="inputimagenn"/>
                    {errors.imagen&&(
                        <p>{errors.imagen}</p>
                    )}
                </div>
                <div className="titlecreate">Type of Diet
                       <select onChange={e=>select(e)} >
                       {diets?.map(e=>{
                             return(
                                <option value={e.diet}>{e.diet}</option>

                             )
                        })}
                       </select>
                       {errors.diet&&(
                        <p>{errors.diet}</p>
                    )}
                </div>
                
                
            </form>
            
            <ul className="uldiet">
                    <li className="dietaselec">
                        {input.diet.map(e=>
                             <div className="p">
                                <button  onClick={()=> deletediet(e)} className="eliminar">X</button>
                                <p >{e}</p>
                                
                              </div> 
                             )}
                        </li>
                    </ul>
                    <button  type="submit" className="crearreceta" >
                    
                    Crear receta
               
                  </button>
        </div>
        
    )
        
    
}