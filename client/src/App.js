import './App.css';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [updatedReview, setUpdatedReview] = useState('');

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/read")
    .then((response)=>{
      setMovieList(response.data.data)
    }, [])
  })

  const submitReview = ()=>{
    const data = {
      movieName: movieName,
      movieReview: movieReview
    }
    Axios.post("http://localhost:3001/api/insert", data)
    .then(()=>{
      console.log({
        message: "Successfully inserted!",
        data: data
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`)
    .then(()=>{
      console.log({
        message: "Successfully deleted!",
        data: movieName
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const updateReview = (movieName) => {
    const data = {
      movieName: movieName,
      movieReview: updatedReview,
    };
    Axios.put("http://localhost:3001/api/update", data)
    .then(()=>{
      console.log({
        message: "Successfully updated!",
        data: data
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form-container">
        <label htmlFor="movieName">Movie name</label>
        <input type="text" name='movieName' autoFocus required onChange={(event)=>{setMovieName(event.target.value)}}/>
        <label htmlFor="movieReview">Movie review</label>
        <input type="text" name="movieReview" required onChange={(event)=>{setMovieReview(event.target.value)}}/>
        <button onClick={submitReview}>Submit</button>

        {movieList.map((val)=>{
          return (
            <>
              <div className="card-container">
                <h2>{val.movie_name}</h2>
                <p>{val.movie_review}</p>
                <button id='btn-delete' onClick={()=>{deleteReview(val.movie_name)}}>Delete</button>
                <input type="text" name="updatedReview" placeholder='New review...' onChange={(e)=>{setUpdatedReview(e.target.value)}}/>
                <button id='btn-update' onClick={()=>{updateReview(val.movie_name)}}>Update</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  )
}

export default App;
