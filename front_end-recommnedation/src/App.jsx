import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/movies/")
      .then((response) => {
        const movieData = response.data;
        console.log(movieData);
        const movieTitles = movieData.map((movie) => movie.title);
        setMovies(movieTitles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formD = new FormData();
  formD.append("data", searchResults);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/", formD)
      .then((resp) => {
        setRecommend(resp.data); // Store the recommended movies in state
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            </button>{" "}
            {/* Use className */}
          </div>
        </form>
        <ul>
          {searchResults.length > 0
            ? searchResults
                .slice(0, 10)
                .map((title, index) => <p key={index}>{title}</p>)
            : null}

          {searchResults.length !== 0 && recommend.length > 0 ? (
            <div>
              <h2>Recommended Movies</h2>
              <ul>
                {recommend.map((movie, index) => (
                  <li key={index}>{movie}</li>
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
