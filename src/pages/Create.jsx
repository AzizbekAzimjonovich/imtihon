import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [img, setImg] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (e) => {
    e.preventDefault();

    if (ingredient.trim()) {
      if (!ingredients.includes(ingredient)) {
        setIngredients((prev) => {
          return [...prev, ingredient];
        });
        toast.success("ingredient added success");
      } else {
        toast.error("This ingredient already added");
      }
    } else {
      toast.error("Please write something");
    }

    setIngredient("");
  };

  const addImg = (e) => {
    e.preventDefault();

    if (img.trim()) {
      if (!img.includes(img)) {
        // Change `images` to `img`
        setImg((prev) => {
          return [...prev, img];
        });
        toast.success("Rasm muvaffaqiyatli qo'shildi");
      } else {
        toast.error("Bu rasm allaqachon qo'shilgan");
      }
    } else {
      toast.error("Iltimos, biror nima yozing");
    }

    setImg(""); // Set img to an empty string after adding it to the array
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      cookingTime: `${cookingTime} minutes`,
      method,
      img,
      ingredients,
    };

    fetch("http://localhost:3000/recipies", {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-10">
        Create New Recipie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-5"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-1xl text-center font-bold">
              Title :
            </span>
          </div>
          <input
            type="text"
            placeholder="Enter your meal name"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-1xl text-center font-bold">
              Cooking Time:
            </span>
          </div>
          <input
            type="number"
            placeholder="Enter preparation time of your meal"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-1xl text-center font-bold">
              Ingridients:
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter ingredents of meal"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
            />
            <button onClick={addIngredient} className="btn btn-success">
              +
            </button>
          </div>
          <div className="mt-1">
            <p>
              Ingridients:{" "}
              {ingredients.map((ing) => {
                return <span key={ing}>{ing} , </span>;
              })}
            </p>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-1xl text-center font-bold">
              Image:
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter ingredents of meal"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setImg(e.target.value)}
              value={img}
            />
            <button onClick={addImg} className="btn btn-success">
              +
            </button>
          </div>
          <div className="mt-1">
            <p>
              Ingridients:{" "}
              {img.map((ing) => {
                return <span key={ing}>{ing} , </span>;
              })}
            </p>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-1xl text-center font-bold">
              Method:
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Enter method of meal"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          ></textarea>
        </label>

        <div className="flex gap-2 items-center justify-center">
          <button className="btn btn-primary w-full ">Apply</button>
          <button className="btn btn-success w-full ">Preview</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
