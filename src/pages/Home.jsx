import React, { useEffect, useState } from "react";
import RecipiesList from "../components/RecipiesList";

function Home() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/recipies")
      .then((data) => {
        return data.json();
      })
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>{recipes && <RecipiesList recipes={recipes} />}</div>;
}

export default Home;
