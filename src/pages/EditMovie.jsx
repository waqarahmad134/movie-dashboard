import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { inputStyle, labelStyle } from '../utilities/Input';
import { info_toaster, success_toaster } from '../utilities/Toaster';
import Select from 'react-select';

export default function EditMovie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location?.state || {};
  console.log('🚀 ~ EditMovie ~ movie:', movie);

  const PreviousCategories =
    movie?.categories?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviousQualtity =
    movie?.qualities?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviousActors =
    movie?.actors?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviousActresses =
    movie?.actresses?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviousSeasons =
    movie?.seasons?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviouSouthActor =
    movie?.south_actor?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const PreviouTags =
    movie?.tags?.map((data) => ({
      value: data.id,
      label: data.name,
    })) || [];

  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [editMovie, setUpdateMovie] = useState({
    title: movie.title,
    thumbnail: null,
    images: [],
    meta_description: movie.meta_description,
    description: movie.description,
    download_link1: movie.download_link1,
    download_link2: movie.download_link2,
    download_link3: movie.download_link3,
    download_link4: movie.download_link4,
    download_link5: movie.download_link5,
    download_link6: movie.download_link6,
    download_link7: movie.download_link7,
    download_link8: movie.download_link8,
    download_link9: movie.download_link9,
    download_link10: movie.download_link10,
    iframe_link1: movie.iframe_link1,
    iframe_link2: movie.iframe_link2,
    iframe_link3: movie.iframe_link3,
    iframe_link4: movie.iframe_link4,
    iframe_link5: movie.iframe_link5,
    iframe_link6: movie.iframe_link6,
    iframe_link7: movie.iframe_link7,
    iframe_link8: movie.iframe_link8,
    iframe_link9: movie.iframe_link9,
    iframe_link10: movie.iframe_link10,
    year: movie.year,
    duration: movie.duration,
    director: movie.director,
    uploadBy: movie.uploadBy,
    category_ids: [],
    quality_ids: [],
    actors_ids: [],
    actresses_ids: [],
    south_actor_ids: [],
    tags_ids: [],
    seasons_ids: [],
  });

  const categories = GetAPI('categories');
  const actors = GetAPI('actors');
  const actress = GetAPI('actress');
  const quality = GetAPI('quality');
  const southActors = GetAPI('southactor');
  const tag = GetAPI('tag');
  const seasons = GetAPI('seasons');

  const categoryOptions =
    categories?.data?.data?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const actorOptions =
    actors?.data?.data?.map((actor) => ({
      value: actor.id,
      label: actor.name,
    })) || [];

  const actressOptions =
    actress?.data?.data?.map((actress) => ({
      value: actress.id,
      label: actress.name,
    })) || [];

  const qualityOptions =
    quality?.data?.data?.map((quality) => ({
      value: quality.id,
      label: quality.name,
    })) || [];

  const southActorOptions =
    southActors?.data?.data?.map((southActor) => ({
      value: southActor.id,
      label: southActor.name,
    })) || [];

  const tagOptions =
    tag?.data?.data?.map((tag) => ({
      value: tag.id,
      label: tag.name,
    })) || [];

  const seasonOptions =
    seasons?.data?.data?.map((season) => ({
      value: season.id,
      label: season.name,
    })) || [];

  const handleCategoriesChange = (selectedCategories) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      category_ids: selectedCategories
        ? selectedCategories.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleQuality = (selectedQuality) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      quality_ids: selectedQuality
        ? selectedQuality.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleActors = (selectedActors) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      actors_ids: selectedActors
        ? selectedActors.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleActress = (selectedActress) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      actresses_ids: selectedActress
        ? selectedActress.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleSouthActors = (selectedSouthActors) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      south_actor_ids: selectedSouthActors
        ? selectedSouthActors.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleTags = (selectedTags) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      tags_ids: selectedTags
        ? selectedTags.map((cat) => String(cat.value))
        : [],
    }));
  };

  const handleSeasons = (selectedSeasons) => {
    setUpdateMovie((prevMovie) => ({
      ...prevMovie,
      seasons_ids: selectedSeasons
        ? selectedSeasons.map((cat) => String(cat.value))
        : [],
    }));
  };

  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'images') {
        setUpdateMovie((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...Array.from(files)],
        }));
      } else {
        setUpdateMovie((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
      }
    } else {
      setUpdateMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const editMovieFunc = async (e) => {
    e.preventDefault();
    setLoader(true);
    const {
      title,
      description,
      thumbnail,
      images,
      meta_description,
      year,
      duration,
      director,
      uploadBy,
      download_link1,
      download_link2,
      download_link3,
      download_link4,
      download_link5,
      download_link6,
      download_link7,
      download_link8,
      download_link9,
      download_link10,
      iframe_link1,
      iframe_link2,
      iframe_link3,
      iframe_link4,
      iframe_link5,
      iframe_link6,
      iframe_link7,
      iframe_link8,
      iframe_link9,
      iframe_link10,
      category_ids,
      quality_ids,
      actors_ids,
      actresses_ids,
      south_actor_ids,
      tags_ids,
      seasons_ids,
    } = editMovie;

    if (title === '') {
      info_toaster('Please Enter Title');
      setLoader(false);
      return;
    }
    if (description === '') {
      info_toaster('Please Enter description');
      setLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description || '');
    formData.append('meta_description', meta_description || '');
    formData.append('download_link1', download_link1 || '');
    formData.append('download_link2', download_link2 || '');
    formData.append('download_link3', download_link3 || '');
    formData.append('download_link4', download_link4 || '');
    formData.append('download_link5', download_link5 || '');
    formData.append('download_link6', download_link6 || '');
    formData.append('download_link7', download_link7 || '');
    formData.append('download_link8', download_link8 || '');
    formData.append('download_link9', download_link9 || '');
    formData.append('download_link10', download_link10 || '');
    formData.append('iframe_link1', iframe_link1 || '');
    formData.append('iframe_link2', iframe_link2 || '');
    formData.append('iframe_link3', iframe_link3 || '');
    formData.append('iframe_link4', iframe_link4 || '');
    formData.append('iframe_link5', iframe_link5 || '');
    formData.append('iframe_link6', iframe_link6 || '');
    formData.append('iframe_link7', iframe_link7 || '');
    formData.append('iframe_link8', iframe_link8 || '');
    formData.append('iframe_link9', iframe_link9 || '');
    formData.append('iframe_link10', iframe_link10 || '');
    formData.append('year', year || '');
    formData.append('duration', duration || '');
    formData.append('director', director || '');
    formData.append('uploadBy', uploadBy || '');
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    if (images.length > 0) {
      images?.forEach((images, index) => {
        formData.append(`images[]`, images);
      });
    }
    category_ids.forEach((category_id) => {
      formData.append('category_ids[]', category_id);
    });
    quality_ids.forEach((quality_id) => {
      formData.append('quality_ids[]', quality_id);
    });
    actors_ids.forEach((actors_id) => {
      formData.append('actors_ids[]', actors_id);
    });
    actresses_ids.forEach((actresses_id) => {
      formData.append('actresses_ids[]', actresses_id);
    });
    south_actor_ids.forEach((south_actor_id) => {
      formData.append('south_actor_ids[]', south_actor_id);
    });
    tags_ids.forEach((tags_id) => {
      formData.append('tags_ids[]', tags_id);
    });
    seasons_ids.forEach((season_id) => {
      formData.append('seasons_ids[]', season_id);
    });
    try {
      let res = await PostAPI(`update-movie/${movie?.id}`, formData);
      if (res?.data?.status === true) {
        success_toaster(res?.data?.message);
        navigate('/');
      } else {
        success_toaster(res?.data?.message);
      }
    } catch (error) {
      console.log('🚀 ~ editMovieFunc ~ error:', error);
      info_toaster('An error occurred while editing the Movie.');
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Movie" />
        <form>
          <div>
            <div className="space-y-5">
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="title">
                    Movie Name
                  </label>
                  <input
                    value={editMovie?.title}
                    onChange={onChange}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Movie Name"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="thumbnail">
                    Thumbnail
                  </label>
                  <input
                    onChange={onChange}
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="thumbnail"
                    className={`${inputStyle} + h-[44px]`}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="images">
                    Screen Shots
                  </label>
                  <input
                    onChange={onChange}
                    type="file"
                    name="images"
                    id="images"
                    placeholder="images"
                    className={inputStyle}
                    multiple
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="meta_description">
                    Meta Description
                  </label>
                  <textarea
                    value={editMovie?.meta_description}
                    onChange={onChange}
                    name="meta_description"
                    id="meta_description"
                    placeholder="meta_description"
                    className={inputStyle}
                    rows="2"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="description">
                    Description
                  </label>
                  <textarea
                    value={editMovie?.description}
                    onChange={onChange}
                    name="description"
                    id="description"
                    placeholder="Description"
                    className={inputStyle}
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link1">
                    Download Link 1
                  </label>
                  <input
                    value={editMovie?.download_link1}
                    onChange={onChange}
                    type="text"
                    name="download_link1"
                    id="download_link1"
                    placeholder="download_link1"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link2">
                    Download Link 2
                  </label>
                  <input
                    value={editMovie?.download_link2}
                    onChange={onChange}
                    type="text"
                    name="download_link2"
                    id="download_link2"
                    placeholder="download_link2"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link3">
                    Download Link 3
                  </label>
                  <input
                    value={editMovie?.download_link3}
                    onChange={onChange}
                    type="text"
                    name="download_link3"
                    id="download_link3"
                    placeholder="download_link3"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link4">
                    Download Link 4
                  </label>
                  <input
                    value={editMovie?.download_link4}
                    onChange={onChange}
                    type="text"
                    name="download_link4"
                    id="download_link4"
                    placeholder="download_link4"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link5">
                    Download Link 5
                  </label>
                  <input
                    value={editMovie?.download_link5}
                    onChange={onChange}
                    type="text"
                    name="download_link5"
                    id="download_link5"
                    placeholder="download_link5"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link6">
                    Download Link 6
                  </label>
                  <input
                    value={editMovie?.download_link6}
                    onChange={onChange}
                    type="text"
                    name="download_link6"
                    id="download_link6"
                    placeholder="download_link6"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link7">
                    Download Link 7
                  </label>
                  <input
                    value={editMovie?.download_link7}
                    onChange={onChange}
                    type="text"
                    name="download_link7"
                    id="download_link7"
                    placeholder="download_link7"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link8">
                    Download Link 8
                  </label>
                  <input
                    value={editMovie?.download_link8}
                    onChange={onChange}
                    type="text"
                    name="download_link8"
                    id="download_link8"
                    placeholder="download_link8"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link9">
                    Download Link 9
                  </label>
                  <input
                    value={editMovie?.download_link9}
                    onChange={onChange}
                    type="text"
                    name="download_link9"
                    id="download_link9"
                    placeholder="download_link9"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link10">
                    Download Link 10
                  </label>
                  <input
                    value={editMovie?.download_link10}
                    onChange={onChange}
                    type="text"
                    name="download_link10"
                    id="download_link10"
                    placeholder="download_link10"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link1">
                    Iframe Link
                  </label>
                  <input
                    value={editMovie?.iframe_link1}
                    onChange={onChange}
                    type="text"
                    name="iframe_link1"
                    id="iframe_link1"
                    placeholder="iframe_link1"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link2">
                    Iframe Link 2
                  </label>
                  <input
                    value={editMovie?.iframe_link2}
                    onChange={onChange}
                    type="text"
                    name="iframe_link2"
                    id="iframe_link2"
                    placeholder="iframe_link2"
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link3">
                    Iframe Link 3
                  </label>
                  <input
                    value={editMovie?.iframe_link3}
                    onChange={onChange}
                    type="text"
                    name="iframe_link3"
                    id="iframe_link3"
                    placeholder="iframe_link3"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link4">
                    Iframe Link 4
                  </label>
                  <input
                    value={editMovie?.iframe_link4}
                    onChange={onChange}
                    type="text"
                    name="iframe_link4"
                    id="iframe_link4"
                    placeholder="iframe_link4"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link5">
                    Iframe Link 5
                  </label>
                  <input
                    value={editMovie?.iframe_link5}
                    onChange={onChange}
                    type="text"
                    name="iframe_link5"
                    id="iframe_link5"
                    placeholder="iframe_link5"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link6">
                    Iframe Link 6
                  </label>
                  <input
                    value={editMovie?.iframe_link6}
                    onChange={onChange}
                    type="text"
                    name="iframe_link6"
                    id="iframe_link6"
                    placeholder="iframe_link6"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link7">
                    Iframe Link 7
                  </label>
                  <input
                    value={editMovie?.iframe_link7}
                    onChange={onChange}
                    type="text"
                    name="iframe_link7"
                    id="iframe_link7"
                    placeholder="iframe_link7"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link8">
                    Iframe Link 8
                  </label>
                  <input
                    value={editMovie?.iframe_link8}
                    onChange={onChange}
                    type="text"
                    name="iframe_link8"
                    id="iframe_link8"
                    placeholder="iframe_link8"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link9">
                    Iframe Link 9
                  </label>
                  <input
                    value={editMovie?.iframe_link9}
                    onChange={onChange}
                    type="text"
                    name="iframe_link9"
                    id="iframe_link9"
                    placeholder="iframe_link9"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link10">
                    Iframe Link 10
                  </label>
                  <input
                    value={editMovie?.iframe_link10}
                    onChange={onChange}
                    type="text"
                    name="iframe_link10"
                    id="iframe_link10"
                    placeholder="iframe_link10"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="year">
                    Year
                  </label>
                  <input
                    value={editMovie?.year}
                    onChange={onChange}
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Year"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="duration">
                    Duration
                  </label>
                  <input
                    value={editMovie?.duration}
                    onChange={onChange}
                    type="text"
                    name="duration"
                    id="duration"
                    placeholder="duration"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="director">
                    Director
                  </label>
                  <input
                    value={editMovie?.director}
                    onChange={onChange}
                    type="text"
                    name="director"
                    id="director"
                    placeholder="director"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="uploadBy">
                    Uploaded By
                  </label>
                  <input
                    value={editMovie?.uploadBy}
                    onChange={onChange}
                    type="text"
                    name="uploadBy"
                    id="uploadBy"
                    placeholder="uploadBy"
                    className={inputStyle}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Categories</label>
                  <Select
                    onChange={handleCategoriesChange}
                    defaultValue={PreviousCategories}
                    name="category_ids"
                    isMulti
                    options={categoryOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Quality</label>
                  <Select
                    onChange={handleQuality}
                    defaultValue={PreviousQualtity}
                    name="quality_ids"
                    isMulti
                    options={qualityOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Actors</label>
                  <Select
                    onChange={handleActors}
                    defaultValue={PreviousActors}
                    name="actors_ids"
                    isMulti
                    options={actorOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Actress</label>
                  <Select
                    onChange={handleActress}
                    defaultValue={PreviousActresses}
                    name="actresses_ids"
                    isMulti
                    options={actressOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>South Actors</label>
                  <Select
                    onChange={handleSouthActors}
                    defaultValue={PreviouSouthActor}
                    name="south_actor_ids"
                    isMulti
                    options={southActorOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Tags</label>
                  <Select
                    onChange={handleTags}
                    defaultValue={PreviouTags}
                    name="tags_ids"
                    isMulti
                    options={tagOptions}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle}>Seasons</label>
                  <Select
                    onChange={handleSeasons}
                    defaultValue={PreviousSeasons}
                    name="seasons_ids"
                    isMulti
                    options={seasonOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-x-2 mt-5">
            <button
              type="submit"
              onClick={editMovieFunc}
              disabled={disabled}
              className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
            >
              Edit
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
}
