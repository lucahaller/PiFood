import React, { Fragment, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getrecetas,
  filterdiets,
  ordenamientofilt,
  ordenaAZZA,
  reloaddetail,
} from "../Actions/actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Paginado from "./Paginado";
import "./Home.css";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes); // Traemos del initial state las todas las recetas
  const [orden, setOrden] = useState("");
  const [numberPage, setnumberPage] = useState(1);
  const [recipesPage, setrecipesPage] = useState(9);
  const indexlastrecipe = numberPage * recipesPage;
  const indexfirstrecipe = indexlastrecipe - recipesPage; // Declaramos los indices
  const currentrecipes = recipes.slice(indexfirstrecipe, indexlastrecipe); // Va a ir trayendo del array dependiendo del lugar de la receta

  const paginado = (num) => {
    setnumberPage(num); //Vamos cambiando el valor inicial
  };

  useEffect(() => {
    dispatch(getrecetas());
    dispatch(reloaddetail([]))
  }, [dispatch]);

  function filterdietas(e) {
    dispatch(filterdiets(e.target.value));
    setnumberPage(1);
  }
  function ordenamiento(e) {
    e.preventDefault();
    dispatch(ordenamientofilt(e.target.value));
    setnumberPage(1);
    setOrden(`Ordenamiento ${e.target.value}`);
  }
  function ordenDEAZZA(e) {
    e.preventDefault();
    dispatch(ordenaAZZA(e.target.value));
    setnumberPage(1);
    setOrden(`Ordenamiento de ${e.target.value}`);
  }
  function recargarrecipes(e) {
    dispatch(getrecetas());
    setnumberPage(1);
  }

  return (
    <div className="one">
      <body className="conteiner">
        <h1 className="title">Encuentra Tu Receta!</h1>

        <div className="filtersybuttons">
          <div className="filters">
            <select onChange={(e) => filterdietas(e)} className="button4">
              <option value="All Diets" className="option">
                All Diets
              </option>
              <option value="gluten free" className="option">
                Gluten free
              </option>
              <option value="lacto ovo vegetarian" className="option">
                Lacto ovo vegetarian
              </option>
              <option value="dairy free" className="option">
                Dairy free
              </option>
              <option value="vegan" className="option">
                Vegan
              </option>
              <option value="paleolithic" className="option">
                Paleolithic
              </option>
              <option value="primal" className="option">
                Primal
              </option>
              <option value="whole 30" className="option">
                Whole 30
              </option>
              <option value="pescatarian" className="option">
                Pescatarian
              </option>
              <option value="ketogenic" className="option">
                Ketogenic
              </option>
              <option value="fodmap friendly" className="option">
                Fodmap friendly
              </option>
            </select>
            <select onChange={(e) => ordenDEAZZA(e)} className="button">
              <option value="AZ" className="option">
                A - Z
              </option>
              <option value="ZA" className="option">
                Z - A
              </option>
            </select>
            <select onChange={(e) => ordenamiento(e)} className="button4">
              <option value="more" className="option">
                Con Mas Healthscore
              </option>
              <option value="low" className="option">
                Con Menos Healthscore
              </option>
            </select>
          </div>
          <div className="searchbut">
        
              <button onClick={(e) => recargarrecipes(e)} className="button4">
                Recargar recetas
              </button>
            
            
              
            

            <div className="search">
              <SearchBar />
            </div>
            <Link to={"/recipes"}>
                <button className="button4">Crea Tu Receta!</button>
              </Link>
          </div>
        </div>
        <div>
          <Paginado
            recipes={recipes.length}
            recipesPage={recipesPage}
            paginado={paginado}
          />
        </div>

        <div className="frags">
          {currentrecipes?.map((e) => {
            return (
              <Fragment>
                <Cards
                  title={e.title}
                  diets={e.diet ? e.diet : e.typediets.map((d) => d.diet)}
                  imagen={e.imagen ? e.imagen : e.imagen}
                  id={e.id}
                />
              </Fragment>
            );
          })}
        </div>
      </body>
    </div>
  );
}
