import { useState, useEffect } from "react";
import { addDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Auth from "../components/Auth";

function CreateMovie() {
  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, []);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [recOscar, setRecOscar] = useState(false);

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        Title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: recOscar,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        placeholder="Movie Title.."
        onChange={(e) => {
          setNewMovieTitle(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Release Date.."
        onChange={(e) => {
          setNewReleaseDate(Number(e.target.value));
        }}
      />
      <input
        type="checkbox"
        checked={recOscar}
        onChange={(e) => setRecOscar(e.target.checked)}
      />
      <label>Received Oscar</label>
      <button onSubmit={submitMovie}>Submit Movie</button>
    </div>
  );
}

export default CreateMovie;
