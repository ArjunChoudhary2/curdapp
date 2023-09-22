import { useEffect, useState } from "react";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import CreateMovie from "./components/CreateMovie";
import Auth from "./components/Auth";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [recOscar, setRecOscar] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  //FIle upload states
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(list);
      console.log(list);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }

    const filesFolderRef = ref(storage, `project files/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: newTitle });
    getMovieList();
  };

  const handleFormSubmit = async () => {
    console.log("press");
    try {
      const doc = await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        receivedOscar: recOscar,
        releaseDate: newReleaseDate,
        userId: auth?.currentUser?.uid,
      });
      console.log(doc?.userId);

      console.log("press");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <Auth />
      <div>
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit">Submit Movie</button>
        </form>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedOscar ? "gold" : "black" }}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              placeholder="new Title..."
            ></input>
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input onChange={(e) => setFileUpload(e.target.files[0])} type="file" />
        <button onClick={() => uploadFile()}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
