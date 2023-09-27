import React, { useState,useEffect } from 'react';
import axios from 'axios';
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/movies/')
      .then(response => {
        const movieData = response.data
        const movieTitles = movieData.map(movie => movie.title);
        setMovies(movieTitles);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const [formData, setFormData] = useState("");
  const formD = new FormData()
  formD.append('data',formData)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://127.0.0.1:8000/', formD)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [searchTerm, setSearchTerm] = useState('');
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
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {searchResults.map((title, index) => (
          <p key={index}>{title}</p>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
