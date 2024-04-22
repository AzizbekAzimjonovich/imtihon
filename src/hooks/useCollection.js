import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

function useCollection() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getCollectionData = async () => {
      const querySnapshot = await getDocs(collection(db, "recipies"));
      querySnapshot.forEach((doc) => {
        const allData = [];
        allData.push({
          id: doc.id,
          ...doc.data(),
        });

        setData(allData);
      });
    };
    getCollectionData();
  }, []);

  return { data };
}

export { useCollection };
