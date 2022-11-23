import axios from "axios";
import React, { useState } from "react";
import loading from "./img/loading.gif";
import notFound from "./img/notFound.webp";

function App() {
  const [img, setImg] = useState("");
  const [dex, setDex] = useState("SV");
  const [shinyImg, setShinyImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const serebiiURL = "https://www.serebii.net/scarletviolet/pokemon";
  // const serebiiTextualURL = "https://www.serebii.net/pokemon/art";
  const serebiiShinyURL = "https://www.serebii.net/Shiny/SV";

  const fetchData = async () => {
    setHasSearched(true);
    const queryText = document.querySelector("#searchbar").value;
    let id;

    if (isNaN(queryText)) {
      // grab id by name
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${queryText}`
        );
        id = res.data.id;
      } catch (error) {
        console.error(error);
        alert("Please use the number (for now)");
      }
    } else {
      // grab id directly
      id = Number(queryText);
      if (dex === "SV") {
        id += 905;
      }
    }
    if (id < 10) {
      id = `00${id}`;
    } else if (id < 100) {
      id = `0${id}`;
    }

    try {
      setIsLoading(true);
      let image = new Image();

      image.onload = function () {
        setImg(`${serebiiURL}/${id}.png`);
        setShinyImg(`${serebiiShinyURL}/${id}.png`);
        setIsFound(true);
      };
      image.onerror = function () {
        console.error("Not found");
        setIsFound(false);
      };

      image.src = `${serebiiURL}/${id}.png`;
    } catch (error) {
      console.error(error);
      setIsFound(false);
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
      <div>If it says not found use the number plz k thx.</div>

      <label>
        <input
          type="radio"
          name="dex"
          onChange={() => setDex("SV")}
          checked={dex === "SV"}
        />
        SV regional
      </label>
      <label style={{ marginLeft: "10px" }}>
        <input
          type="radio"
          name="dex"
          onChange={() => setDex("SwSh")}
          checked={dex === "SwSh"}
        />
        Global
      </label>
      <input
        type="text"
        id="searchbar"
        placeholder="Pokémon name or number"
        onKeyUp={handleInput}
        style={{
          margin: "20px",
          outline: "none",
          width: "400px",
          padding: "10px",
        }}
      />

      <button onClick={fetchData}>Search</button>

      {isLoading ? (
        <img src={loading} alt="Loading" />
      ) : isFound ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <div>Normal sprite</div>
            <img src={img} alt="" style={{ verticalAlign: "middle" }} />
          </div>
          <div>
            <div>Shiny sprite</div>
            <img src={shinyImg} alt="" style={{ verticalAlign: "middle" }} />
          </div>
        </>
      ) : hasSearched ? (
        <img src={notFound} alt="Not found" />
      ) : null}
    </>
  );
}

export default App;
