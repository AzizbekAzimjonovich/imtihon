import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function RecipieEl() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/recipies/${id}`)
      .then((data) => data.json())
      .then((recipe) => {
        setRecipe(recipe);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="mt-4 text-2xl font-bold">Recipe elements</p>
      <div className="max-w-full">
        {recipe && (
          <div className="carousel carousel-center  p-4 space-x-4 bg-neutral rounded-box h-72 ">
            {recipe.img.map((item, index) => (
              <div key={index} className="carousel-item">
                <img
                  src={item}
                  className="rounded-box"
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <div className="flex gap-2">
        <p className="font-bold text-2xl">Ingredients:</p>
        {recipe.ingredients.map((item, index) => (
          <p
            key={index}
            className="rounded-2xl bg-slate-500 text-white pt-1 pb-1 pl-2 pr-2"
          >
            {item}
          </p>
        ))}
      </div>
      <p className="font-bold text-2xl">Cooking time : {recipe.cookingTime}</p>
      <p className="font-bold text-2xl">Method:</p>
      <p>{recipe.method}</p>
      <Link
        to={"/"}
        className="btn btn-neutral bg-slate-500 text-white items-right w-20 mb-10"
      >
        Back
      </Link>
    </div>
  );
}

export default RecipieEl;
