import axios from "axios";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [shinyImg, setShinyImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const serebiiURL = "https://www.serebii.net/scarletviolet/pokemon";
  const serebiiShinyURL = "https://www.serebii.net/Shiny/SV";
  const notFoundURL =
    "https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif";
  const loadingURL = "https://media.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif";

  const fetchData = async () => {
    setHasSearched(true);
    try {
      setIsLoading(true);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);
      console.info(res.data);
      let id = res.data.id;
      if (id < 100) {
        id = `0${id}`;
      }

      setImg(`${serebiiURL}/${id}.png`);
      setShinyImg(`${serebiiShinyURL}/${id}.png`);
      setIsFound(true);
    } catch (error) {
      console.error(error);

      if (!isNaN(text)) {
        setImg(`${serebiiURL}/${text}.png`);
        setShinyImg(`${serebiiShinyURL}/${text}.png`);
        setIsFound(true);
      } else {
        setIsFound(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <>
      <h3>Ez shiny Pokémon finder 9000</h3>
      If it says not found use the number plz k thx. If still not found, add 905
      to the number. Shhh don't ask
      <br />
      <input
        type="text"
        placeholder="Pokémon name or #"
        onKeyDown={(event) => setText(event.target.value)}
        onKeyUp={handleInput}
        style={{ margin: "20px" }}
      />
      <button onClick={fetchData}>Search</button>
      <br />
      {isLoading ? (
        <img src={loadingURL} alt="Loading" />
      ) : isFound ? (
        <>
          <div>
            <img src={img} alt="" style={{ verticalAlign: "middle" }} />
            Normal sprite
          </div>
          <div>
            <img src={shinyImg} alt="" style={{ verticalAlign: "middle" }} />
            Shiny sprite
          </div>
        </>
      ) : hasSearched ? (
        <img src={notFoundURL} alt="Not found" />
      ) : null}
    </>
  );
}

export default App;
