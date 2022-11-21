import axios from "axios";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [shinyImg, setShinyImg] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);
      setImg(res.data.sprites.front_default);
      setShinyImg(res.data.sprites.front_shiny);
    } catch (error) {
      console.error(error);
      setImg(
        "https://i.kym-cdn.com/entries/icons/facebook/000/025/666/260.jpg"
      );
      setShinyImg("");
    }
  };

  return (
    <>
      <div>Ez shiny Pokémon finder 9000</div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={fetchData}>Search</button>
      <br />
      <img src={img} />
      <img src={shinyImg} />
    </>
  );
}

export default App;
