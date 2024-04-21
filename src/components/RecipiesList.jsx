import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipieEl from "./RecipieEl";
import { MdNotInterested } from "react-icons/md";

function RecipiesList({ recipes }) {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) {
      window.location.reload();
    }
  }, [deleted]);

  const del = (id) => {
    fetch("http://localhost:3000/recipies/" + id, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <p className="mb-10 mt-10 font-bold text-2xl">Recipies</p>
      <div className="no-users">
        {recipes.length === 0 && <h2>No Recipie</h2>}
      </div>
      <div className="grid grid-cols-3 gap-5">
        {recipes
          .slice()
          .reverse()
          .map((recipe) => (
            <div
              key={recipe.id}
              className="w-80 bg-base-100 shadow-xl flex flex-col justify-between"
            >
              <div className="p-3 flex flex-col gap-4">
                <button
                  onClick={() => del(recipe.id)}
                  className="flex justify-end"
                >
                  <MdNotInterested className="h-8 w-8" />
                </button>
                <p className="text-2xl">{recipe.title}</p>
                <p>{recipe.method}</p>
                <div className="flex gap-2 w-full justify-end mb-4">
                  <p
                    className="bg-success text-black"
                    style={{
                      fontSize: "12px",
                      padding: "2px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    ! NEW
                  </p>
                  <p
                    className="bg-accent text-black"
                    style={{
                      fontSize: "12px",
                      padding: "2px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {recipe.cookingTime}
                  </p>
                </div>
              </div>
              <Link to={`./RecipieEl/${recipe.id}`}>
                <img src={recipe.img[0]} alt="Shoes" />
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

export default RecipiesList;
