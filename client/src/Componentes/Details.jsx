import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getdetailid ,reloaddetail} from "../Actions/actions";
import { Link } from "react-router-dom";
import "./Details.css";

export default function Details(props) {
  const recipes = useSelector((state) => state.getdetails);
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getdetailid(id));
    dispatch(reloaddetail([]))
  }, [dispatch, id]);
  console.log(recipes);
  return (
    <div className="back"> 
       {recipes.length === 0 ? <div className="divloading"><img src = "https://i.gifer.com/origin/ea/eaab2ae945b4ddb2457f1a350cae03cc.gif" alt = "img not found" className="loading"/></div>:(
      <div className="conten">
        <div>
          <Link to="/home">
            <button className="volver">Back</button>
          </Link>
        </div>
        <div>
          <h1 className="titleinfo">{recipes?.title}</h1>
        </div>
        <div>
          <h4 className="health">{recipes?.health_score}</h4>
        </div>
        <div className="imgXresumen">
          <img
            className="imagendetail"
            src={recipes?.imagen}
            alt="img error"
            width="500px"
            height="500px"
          />
          <div className="resumenplato">
            Summary
            <p
              dangerouslySetInnerHTML={{ __html: recipes.resumen_plato }}
              className="resumen"
            />
            <div className="titledietas">
              Diets:{" "}
              {recipes?.diet
                ? recipes?.diet?.map((e) => {
                    return <div className="dieta">{e}</div>;
                  })
                : recipes?.typediets?.map((d) => {
                    return <div className="dieta">{d.diet}</div>;
                  })}
            </div>
          </div>
        </div>

        <ul className="steptitle">
          Steps
          {Array.isArray(recipes.steps) ? (
            recipes.steps?.map((e) => {
              return (
                <div className="stepli">
                  <p>
                    <strong>{e.number + ") "}</strong>
                  </p>
                  <li key={e.number} className="stepnumber">
                    {e.step}
                  </li>
                </div>
              );
            })
          ) : (
            <li>{recipes.steps}</li>
          )}
        </ul>
      </div>
             )}
    </div>
  );
}
