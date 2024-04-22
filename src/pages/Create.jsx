import { Form, useActionData, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useCreate } from "../hooks/useCreate";

function Create() {
  const { data, addNewDoc } = useCreate();
  const createData = useActionData();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [imgs, setImgs] = useState([]);
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (createData && !data) {
      const newRecipe = {
        ...createData,
        ingredients,
        imgs,
      };
      await addNewDoc(newRecipe);
      navigate("/");
    }
  };

  const addIngredient = (e) => {
    e.preventDefault();
    if (!ingredients.includes(ingredient)) {
      setIngredients((prev) => [...prev, ingredient]);
    }
    setIngredient("");
  };

  const addImg = (e) => {
    e.preventDefault();
    if (!imgs.includes(img)) {
      setImgs((prev) => [...prev, img]);
    }
    setImg("");
  };

  useEffect(() => {
    if (createData && !data) {
      const newRecipe = {
        ...createData,
        ingredients,
        imgs,
      };
      addNewDoc(newRecipe);
    }
  }, [createData, data]);

  return (
    <div className="grid place-items-center">
      <div className="max-w-96 w-full">
        <h1 className="text-3xl text-center font-bold">Create New Recipe</h1>
        <Form method="POST" onSubmit={handleSubmit}>
          <FormInput name="title" label="Title" type="text" />
          <div className="flex justify-center flex-col">
            <div className="flex items-center gap-5 w-full">
              <label className="form-control w-full mb-3">
                <div className="label">
                  <span className="label-text">Ingredient</span>
                </div>
                <input
                  onChange={(e) => setIngredient(e.target.value)}
                  type="text"
                  name="ingredients"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={ingredient}
                />
              </label>
              <button
                onClick={addIngredient}
                className="btn btn-secondary mt-5"
              >
                +
              </button>
            </div>
            <p className="text-left -mt-2 mb-3">
              Ingredients:{" "}
              {ingredients.map((ing) => (
                <span key={ing}>{ing},</span>
              ))}
            </p>
            <div className="flex items-center gap-5 w-full">
              <label className="form-control w-full mb-3">
                <div className="label">
                  <span className="label-text">Image URL</span>
                </div>
                <input
                  onChange={(e) => setImg(e.target.value)}
                  type="text"
                  name="imgs"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={img}
                />
              </label>
              <button onClick={addImg} className="btn btn-secondary mt-5">
                +
              </button>
            </div>
            <p className="text-left -mt-2 mb-3">
              Images:{" "}
              {imgs.map((img) => (
                <span key={img}>{img},</span>
              ))}
            </p>
          </div>
          <FormInput name="cookingTime" label="Cooking Time" type="number" />
          <FormInput name="method" label="Method" type="text" />
          <div>
            <button className="btn btn-secondary w-full mb-3" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Create;
