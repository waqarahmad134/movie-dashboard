import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovieModel = ({ fetchData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [actorsIds, setActorsIds] = useState([]);
  const [qualityIds, setQualityIds] = useState([]);
  const [actressesIds, setActressesIds] = useState([]);
  const [southActorIds, setSouthActorIds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [actresses, setActresses] = useState([]);
  const [southActors, setSouthActors] = useState([]);

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
    axios.post('http://localhost:8000/api/add-movie', {
      title,
      description,
      category_ids: categoryIds,
      actors_ids: actorsIds,
      quality_ids: qualityIds,
      actresses_ids: actressesIds,
      south_actor: southActorIds,
    }).then(response => {
      fetchData();
      // Reset form
      setTitle('');
      setDescription('');
      setCategoryIds([]);
      setActorsIds([]);
      setQualityIds([]);
      setActressesIds([]);
      setSouthActorIds([]);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
      
      {/* Render multi-select dropdowns */}
      {/* ... */}
      
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieModel;
