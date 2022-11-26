import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import loading from "./img/loading.gif";
import notFound from "./img/notFound.webp";

function App() {
  const [img, setImg] = useState("");
  const [shinyImg, setShinyImg] = useState("");
  const [generation, setGeneration] = useState({
    value: "scarlet-violet",
    label: "Scarlet/Violet",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isShinyFound, setIsShinyFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // const serebiiURL = "https://www.serebii.net/pokemon/art";
  // const serebiiShinyURL = "https://www.serebii.net/Shiny/home";
  const baseURL = "https://img.pokemondb.net/sprites";

  const generations = [
    { value: "red-blue", label: "Red/blue" },
    { value: "silver", label: "Silver" },
    { value: "ruby-sapphire", label: "Ruby/Sapphire" },
    { value: "diamond-pearl", label: "Diamond/Pearl" },
    { value: "black-white", label: "Black/White" },
    { value: "x-y", label: "X/Y" },
    { value: "lets-go-pikachu-eevee", label: "Let's go" },
    { value: "sword-shield", label: "Sword/Shield" },
    { value: "home", label: "Home" },
    { value: "scarlet-violet", label: "Scarlet/Violet" },
  ];

  const fetchData = async () => {
    setHasSearched(true);
    const queryText = document.querySelector("#searchbar").value;

    if (!isNaN(queryText)) {
      console.error("Number detected");
      setIsFound(false);
      setIsShinyFound(false);
    } else {
      try {
        setIsLoading(true);
        let image = new Image();
        let shinyImage = new Image();

        image.onload = () => {
          setImg(`${baseURL}/${generation.value}/normal/${queryText}.png`);
          setIsFound(true);
        };
        shinyImage.onload = () => {
          setShinyImg(`${baseURL}/${generation.value}/shiny/${queryText}.png`);
          setIsShinyFound(true);
        };
        image.onerror = () => {
          console.error("Normal not found");
          setIsFound(false);
        };
        shinyImage.onerror = () => {
          console.error("Shiny not found");
          setIsShinyFound(false);
        };

        image.src = `${baseURL}/${generation.value}/normal/${queryText}.png`;
        shinyImage.src = `${baseURL}/${generation.value}/shiny/${queryText}.png`;
      } catch (error) {
        console.error(error);
        setIsFound(false);
      }
    }
    setIsLoading(false);
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const renderImages = () => {
    if (isLoading) {
      return <img src={loading} alt="Loading" />;
    }
    if (hasSearched) {
      return (
        <>
          <div style={{ marginBottom: "20px" }}>
            <Typography gutterBottom>Normal sprite</Typography>
            <img
              src={isFound ? img : notFound}
              alt=""
              style={{ verticalAlign: "middle" }}
            />
          </div>
          <div>
            <Typography gutterBottom>Shiny sprite</Typography>
            <img
              src={isShinyFound ? shinyImg : notFound}
              alt=""
              style={{ verticalAlign: "middle" }}
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <h3>Ez shiny Pokémon finder 9000</h3>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Autocomplete
          disablePortal
          options={generations}
          value={generation}
          autoComplete
          sx={{ width: 200 }}
          onChange={(event, value) => setGeneration(value)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => <TextField {...params} label="Generation" />}
        />

        <TextField
          id="searchbar"
          placeholder="Pokémon name"
          onKeyUp={handleInput}
          style={{
            width: "400px",
          }}
        />

        <Button sx={{ ml: 1 }} variant="contained" onClick={fetchData}>
          Search
        </Button>
      </div>

      {renderImages()}
    </>
  );
}

export default App;
