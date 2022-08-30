import "./Paginado.css";
import React from "react";

export default function Paginado({ recipes, recipesPage, paginado }) {
  const numbers = [];

  for (let i = 0; i < Math.ceil(recipes / recipesPage); i++) {
    // hacemos la logica y pusheamos el resultado para que nos de el numero de pagian
    numbers.push(i + 1); // correspondiente a la relación que le otorgamos, el ceil lo redondea a un num entero
  }
  return (
    <nav className="Nav">
      <ul className="paginado">
        {numbers &&
          numbers.map((num) => (
            <li className="num" key={num}>
              <button className="scrolldown" onClick={() => paginado(num)}>
                {num}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
