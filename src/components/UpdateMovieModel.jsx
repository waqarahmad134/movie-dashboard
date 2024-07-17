import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovieModel = ({ movie, fetchData }) => {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [categoryIds, setCategoryIds] = useState(movie.category_ids);
  const [actorsIds, setActorsIds] = useState(movie.actors_ids);
  const [qualityIds, setQualityIds] = useState(movie.quality_ids);
  const [actressesIds, setActressesIds] = useState(movie.actresses_ids);
  const [southActorIds, setSouthActorIds] = useState(movie.south_actor);

  useEffect(() => {
    // Fetch categories, actors, qualities, actresses, and south actors for the dropdowns
    axios.get('http://localhost:8000/api/categories').then(response => setCategories(response.data));
    axios.get('http://localhost:8000/api/actors').then(response => setActors(response.data));
    axios.get('http://localhost:8000/api/qualities').then(response => setQualities(response.data));
    axios.get('http://localhost:8000/api/actresses').then(response => setActresses(response.data));
    axios.get('http://localhost:8000/api/south-actors').then(response => setSouthActors(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/update/${movie.id}`, {
      title,
      description,
      category_ids: categoryIds,
      actors_ids: actorsIds,
      quality_ids: qualityIds,
      actresses_ids: actressesIds,
      south_actor: southActorIds,
    }).then(response => {
      fetchData();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
      
      {/* Render multi-select dropdowns */}
      {/* ... */}
      
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default UpdateMovieModel;
