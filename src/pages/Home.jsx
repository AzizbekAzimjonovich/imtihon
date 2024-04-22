import React, { useEffect, useState } from "react";
import RecipiesList from "../components/RecipiesList";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { data: recipies } = useCollection();

  return (
    <div>
      <h1>All card</h1>
      {recipies && <RecipiesList recipies={recipies} />}
    </div>
  );
}

export default Home;
