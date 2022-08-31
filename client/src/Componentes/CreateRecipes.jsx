import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getdiets, postrecipes } from "../Actions/actions";
import { Link, useHistory } from "react-router-dom";
import "./CreateRecipes.css";

export default function CreateRecipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setinput] = useState({
    title: "",
    resumen_plato: "",
    health_score: "",
    steps: "",
    imagen: "",
    diet: [],
  });
  const [errors, setErrors] = useState({});
  const diets = useSelector((state) => state.typediet);

  useEffect(() => {
    dispatch(getdiets());
  }, []);

  function handlechangue(e) {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function reload() {
    window.location.href = window.location.href;
  }
  function select(e) {
    if (!input.diet.includes(e.target.value)) {
      setinput({
        ...input,
        diet: [...input.diet, e.target.value],
      });
    }
  }
  function post(e) {
    e.preventDefault();
    if (
      errors.title ||
      errors.resumen_plato ||
      errors.health_score ||
      errors.steps ||
      errors.imagen ||
      input.title === "" ||
      input.health_score === "" ||
      input.imagen === "" ||
      input.resumen_plato === "" ||
      input.steps === ""
    ) {
      alert(
        " Error: Receta no creada, porfavor rellene los campos especificados y/o corriga los errores"
      );
    } else {
      dispatch(postrecipes(input));
      alert("Receta creada con éxito!");
      setinput({
        title: "",
        resumen_plato: "",
        health_score: "",
        steps: "",
        imagen: "",
        diet: [],
      });
      history.push("/home");
      reload();
    }
  }
  function deletediet(e) {
    setinput({
      ...input,
      diet: input.diet.filter((d) => d !== e),
    });
  }
  function validate(input) {
    let errors = {};
    if (!/^[A-Z]+$/i.test(input.title)) {
      errors.title = "Insertar un titulo para la receta";
    } else if(input.title.length > 20){
      errors.title = "Inserte un titulo menor a 20 caracteres"
    }else if (!input.resumen_plato) {
      errors.resumen_plato = "Redactar un resumen para la receta";
    } else if (
      input.health_score < 0 ||
      input.health_score > 100 ||
      !input.health_score ||
      (!/^[0-9]+$/.test(input.health_score))
      
    ) {
      errors.health_score = "Declarar un valor entero entre 0 y 100";
    } else if (!input.steps) {
      errors.steps = "Redactar los pasos a seguir!";
    } else if (
      !input.imagen.length > 0 ||
      !input.imagen.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ){
      errors.imagen = "Inserte una Dirección de imágen";
    }
    return errors;
  }
  console.log(input);
  return (
    <div className="CreateBody">
      <form onSubmit={(e) => post(e)} className="formulario">
        <div className="crearyvolver">
          <Link to="/home">
            <button className="volverhome">Back</button>
          </Link>
          <button type="submit" className="crearreceta">
            Create recipe
          </button>
        </div>

        <div>
          <label className="titlecreate">Title</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handlechangue(e)}
            className="inputtitle"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label className="titlecreate">Summary</label>
          <input
            type="text"
            value={input.resumen_plato}
            name="resumen_plato"
            onChange={(e) => handlechangue(e)}
            className="inputsummary"
          />
          {errors.resumen_plato && (
            <p className="error">{errors.resumen_plato}</p>
          )}
        </div>
        <div>
          <label className="titlecreate">Healthscore</label>
          <input
            type="number"
            value={input.health_score}
            name="health_score"
            onChange={(e) => handlechangue(e)}
            placeholder="70"
            className="inputfor"
          />
          {errors.health_score && (
            <p className="error">{errors.health_score}</p>
          )}
        </div>
        <div>
          <label className="titlecreate">Steps</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handlechangue(e)}
            className="inputsteps"
          />
          {errors.steps && <p className="error">{errors.steps}</p>}
        </div>
        <div>
          <label className="titlecreate">Image</label>
          <input
            type="text"
            value={input.imagen}
            name="imagen"
            placeholder="Https://.."
            onChange={(e) => handlechangue(e)}
            className="inputimagenn"
          />
          {errors.imagen && <p className="error">{errors.imagen}</p>}
        </div>
        <div className="titlecreate">
          Type of Diet
          <select onChange={(e) => select(e)} className="inputselect">
            {diets?.map((e) => {
              return (
                <option key={e.id} value={e.diet}>
                  {e.diet}
                </option>
              );
            })}
          </select>
        </div>
        <ul className="uldiet">
          <li className="dietaselec">
            {input.diet.map((e) => {
              return (
                <button key={e} onClick={() => deletediet(e)} className="pd">
                  {e}
                </button>
              );
            })}
          </li>
        </ul>
      </form>
    </div>
  );
}
