import React from "react";
import { Link } from "react-router-dom";
import RecipieEl from "./RecipieEl";

function RecipiesList({ recipes }) {
  return (
    <>
      <p className="mb-10 mt-10 font-bold text-2xl">Recipies</p>
      <div className="grid grid-cols-3 gap-5">
        {recipes
          .slice()
          .reverse()
          .map((recipe) => (
            <Link
              key={recipe.id}
              to={`./RecipieEl/${recipe.id}`}
              className="w-80 bg-base-100 shadow-xl flex flex-col justify-between"
            >
              <div className="p-3 flex flex-col gap-4">
                <button className="flex justify-end">delete</button>
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
              <img src={recipe.img[0]} alt="Shoes" />
            </Link>
          ))}
      </div>
    </>
  );
}

export default RecipiesList;
