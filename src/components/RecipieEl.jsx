import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const docRef = doc(db, "recipies", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return null;
};

function RecipieEl() {
  const data = useLoaderData();
  return (
    <div className="flex flex-col gap-4">
      <p className="mt-4 text-2xl font-bold">Recipe elements</p>
      <div className="max-w-full">
        {data && (
          <div className="carousel carousel-center  p-4 space-x-4 bg-neutral rounded-box h-72 ">
            {data.imgs.map((item, index) => (
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
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <div className="flex gap-2">
        <p className="font-bold text-2xl">Ingredients:</p>
        {data.ingredients.map((item, index) => (
          <p
            key={index}
            className="rounded-2xl bg-slate-500 text-white pt-1 pb-1 pl-2 pr-2"
          >
            {item}
          </p>
        ))}
      </div>
      <p className="font-bold text-2xl">Cooking time : {data.cookingTime}</p>
      <p className="font-bold text-2xl">Method:</p>
      <p>{data.method}</p>
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
