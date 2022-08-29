import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getrecetasName } from "../Actions/actions";
import "./SearchBar.css";

export default function SearchBar({setnumberPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function inputname(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function submitName(e) {
    e.preventDefault();
     
    dispatch(getrecetasName(name));
    setnumberPage(1)
    setName("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar receta.."
        onChange={(e) => inputname(e)}
        value={name}
        className="input"
      />
      <button
        type="submit"
        onClick={(e) => submitName(e)}
        className="buttonsear"
      >
        Buscar
      </button>
    </div>
  );
}