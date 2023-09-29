import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movies/")
      .then((response) => {
        const movieData = response.data;
        const movieTitles = movieData.map((movie) => movie.title);
        setMovies(movieTitles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [formData, setFormData] = useState("");
  const formD = new FormData();
  formD.append("data", formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/", formD)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    // Filter movies that contain the search term
    const results = movies.filter((movie) =>
      movie.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  return (
    <>
      <div>
        <h1 className="">Movie Search</h1>
        <div class="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            class="search-input"
            placeholder="Search for a movie"
          />
          <button class="search-button">Search</button>
        </div>
        <ul>
          {searchResults.length > 0 ? (
            searchResults
              .slice(0, 10)
              .map((title, index) => <p key={index}>{title}</p>)
          ) : (
            <p></p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
