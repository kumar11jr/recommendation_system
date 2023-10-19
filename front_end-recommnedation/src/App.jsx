import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [images,setimages] = useState([]);

  // get movies data loaded from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movies/")
      .then((response) => {
        const movieData = response.data;
        // console.log(movieData);
        const movieTitles = movieData.map((movie) => movie.title);
        setMovies(movieTitles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formD = new FormData();
  formD.append("data", searchResults);


  // getting recommendation by clicking search button
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/", formD)
      .then((resp) => {
        // console.log()
        setRecommend(resp.data[0]); // Store the recommended movies in state
        // recommendImages = 
        // console.log(recommendImages[0])
        // console.log(recommendImages)
        // console.log(img1)
        setimages(resp.data[1])
      })
      .catch((error) => {
        console.log(error);
      });
  };
// console.log(recommendImages[0])
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    // Show suggestions if the input is not empty
    if (query) {
      const results = movies.filter((movie) =>
        movie.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      // Clear suggestions when the input is empty
      setSearchResults([]);
    }
  };

  return (
    <>
      <div>
        <h1 className="">Movie Search</h1>
        <form onSubmit={handleSubmit}>
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input" // Use className instead of class
              placeholder="Search for a movie"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>
        <ul>
          {searchResults.length > 0
            ? searchResults
                .slice(0, 10)
                .map((title, index) => <p key={index}>{title}</p>)
            : null}

          {/* Display recommended movies with images */}
          {recommend.length > 0 ? (
            <div>
              <h2>Recommended Movies</h2>
              <ul>
                {recommend.map((movie, index) => (
                  <li key={index}>
                    {/* Display recommended movie title */}
                    {movie}
                    {/* Display corresponding image */}
                  </li>
                ))}
              </ul>
              <ul className="recommended-movies">
  {images.map((path, index) => (
    <li key={index} className="movie-item">
      <img
        src={path}
        alt={`Recommended Movie ${index + 1}`}
        className="movie-image"
      />
    </li>
  ))}
</ul>

            </div>
          ) : null}
        </ul>
      </div>
    </>
  );
}

export default App;
