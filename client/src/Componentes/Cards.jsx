import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

export default function Cards({ title, imagen, diets, id }) {
  //  const dietas = []
  //  for (let i = 0; i < diets.length; i++) {
  //      dietas.push(diets[i])}
  //   console.log(dietas)
  // }
  // const dietas = diets.join(",")
  return (
    <div className="Card">
      <h3 className="info">{title}</h3>
      < Link to={"/home/" + id}>
      <div
        className="img"
        style={{
          backgroundImage: `url(${imagen})`,
          width: "300px",
          height: "200px",
        }}
      />
      </Link>
      
      <div className="diets">
        {diets?.map((e) => {
          return <div className="diet">{e}</div>;
        })}
      </div>
    </div>
  );
}
