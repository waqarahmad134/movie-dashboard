import React, { useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { inputStyle, labelStyle } from '../utilities/Input';
import { info_toaster, success_toaster } from '../utilities/Toaster';
import Select from 'react-select';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

export default function AddMovie() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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

  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addMovie, setAddMovie] = useState({
    title: '',
    thumbnail: null,
    images: [],
    meta_description: '',
    description: '',
    download_link1: '',
    download_link2: '',
    download_link3: '',
    download_link4: '',
    download_link5: '',
    iframe_link1: '',
    iframe_link2: '',
    iframe_link3: '',
    iframe_link4: '',
    iframe_link5: '',
    year: '',
    duration: '',
    director: '',
    uploadBy: secureLocalStorage.getItem('name'),
    category_ids: [],
    quality_ids: [],
    actors_ids: [],
    actresses_ids: [],
    south_actor_ids: [],
    tags_ids: [],
    seasons_ids: [],
  });

  const onChange = (e) => {
    if (e?.target?.type === 'file') {
      if (e.target.name === 'images') {
        setAddMovie({
          ...addMovie,
          [e.target.name]: [...addMovie.images, ...e.target.files],
        });
      } else {
        setAddMovie({ ...addMovie, [e.target.name]: e.target.files[0] });
      }
    } else if (e?.target) {
      const value = e?.target?.name?.endsWith('ids')
        ? Array.from(e.target.selectedOptions, (option) =>
            option.value.toString(),
          )
        : e?.target?.value;
      setAddMovie({ ...addMovie, [e.target?.name]: value });
    } else {
      const { name, value } = e;
      setAddMovie((prevState) => ({
        ...prevState,
        [name]: value.map((option) => option.value.toString()),
      }));
    }
  };

  const addMovieFunc = async (e) => {
    e.preventDefault();
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
      iframe_link1,
      iframe_link2,
      iframe_link3,
      iframe_link4,
      iframe_link5,
      category_ids,
      quality_ids,
      actors_ids,
      actresses_ids,
      south_actor_ids,
      tags_ids,
      seasons_ids,
    } = addMovie;

    if (title === '') {
      info_toaster('Please Enter Title');
    } else if (description === '') {
      info_toaster('Please Enter description');
    } else if (thumbnail == null) {
      info_toaster('Please Enter Image');
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('meta_description', meta_description);
      formData.append('download_link1', download_link1);
      formData.append('download_link2', download_link2);
      formData.append('download_link3', download_link3);
      formData.append('download_link4', download_link4);
      formData.append('download_link5', download_link5);
      formData.append('iframe_link1', iframe_link1);
      formData.append('iframe_link2', iframe_link2);
      formData.append('iframe_link3', iframe_link3);
      formData.append('iframe_link4', iframe_link4);
      formData.append('iframe_link5', iframe_link5);
      formData.append('thumbnail', thumbnail);
      formData.append('year', year);
      formData.append('duration', duration);
      formData.append('director', director);
      formData.append('uploadBy', uploadBy);
      images?.forEach((images, index) => {
        formData.append(`images[]`, images);
      });
      category_ids.forEach((id) => formData.append('category_ids[]', id));
      quality_ids.forEach((id) => formData.append('quality_ids[]', id));
      actors_ids.forEach((id) => formData.append('actors_ids[]', id));
      actresses_ids.forEach((id) => formData.append('actresses_ids[]', id));
      south_actor_ids.forEach((id) => formData.append('south_actor_ids[]', id));
      tags_ids.forEach((id) => formData.append('tags_ids[]', id));
      seasons_ids.forEach((id) => formData.append('seasons_ids[]', id));
      try {
        let res = await PostAPI('add-movie', formData);
        if (res?.data?.status === true) {
          setLoader(false);
          success_toaster(res?.data?.message);
          navigate("/");
          setAddMovie({
            title: '',
            thumbnail: null,
            meta_description: '',
            description: '',
            download_link1: '',
            download_link2: '',
            download_link3: '',
            download_link4: '',
            download_link5: '',
            iframe_link1: '',
            iframe_link2: '',
            iframe_link3: '',
            iframe_link4: '',
            iframe_link5: '',
            year: '',
            duration: '',
            uploadBy: '',
            director: '',
            category_ids: [],
            quality_ids: [],
            actors_ids: [],
            actresses_ids: [],
            south_actor_ids: [],
            tags_ids: [],
            seasons_ids: [],
          });
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
         
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
        info_toaster('An error occurred while adding the Movie.');
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add New Movie" />
        <form>
          <div>
            <div className="space-y-5">
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="title">
                    Movie Name
                  </label>
                  <input
                    value={addMovie?.title}
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
                    value={addMovie?.meta_description}
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
                    value={addMovie?.description}
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
                    value={addMovie?.download_link1}
                    onChange={onChange}
                    type="text"
                    name="download_link1"
                    id="download_link1"
                    placeholder="download_link1"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link2">
                    Download Link 2
                  </label>
                  <input
                    value={addMovie?.download_link2}
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
                    value={addMovie?.download_link3}
                    onChange={onChange}
                    type="text"
                    name="download_link3"
                    id="download_link3"
                    placeholder="download_link3"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="download_link4">
                    Download Link 4
                  </label>
                  <input
                    value={addMovie?.download_link4}
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
                    value={addMovie?.download_link5}
                    onChange={onChange}
                    type="text"
                    name="download_link5"
                    id="download_link5"
                    placeholder="download_link5"
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
                    value={addMovie?.iframe_link1}
                    onChange={onChange}
                    type="text"
                    name="iframe_link1"
                    id="iframe_link1"
                    placeholder="iframe_link1"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link2">
                    Iframe Link 2
                  </label>
                  <input
                    value={addMovie?.iframe_link2}
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
                    value={addMovie?.iframe_link3}
                    onChange={onChange}
                    type="text"
                    name="iframe_link3"
                    id="iframe_link3"
                    placeholder="iframe_link3"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="iframe_link4">
                    Iframe Link 4
                  </label>
                  <input
                    value={addMovie?.iframe_link4}
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
                    value={addMovie?.iframe_link5}
                    onChange={onChange}
                    type="text"
                    name="iframe_link5"
                    id="iframe_link5"
                    placeholder="iframe_link5"
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
                    value={addMovie?.year}
                    onChange={onChange}
                    type="text"
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
                    value={addMovie?.duration}
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
                    value={addMovie?.director}
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
                    value={addMovie?.uploadBy}
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
                  <label className={labelStyle} htmlFor="category_ids">
                    Select Category
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'category_ids',
                        value: selectedOptions,
                      })
                    }
                    name="category_ids"
                    isMulti
                    options={categoryOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="quality_ids">
                    Select Quality
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'quality_ids',
                        value: selectedOptions,
                      })
                    }
                    name="quality_ids"
                    isMulti
                    options={qualityOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="actors_ids">
                    Select Actors
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'actors_ids',
                        value: selectedOptions,
                      })
                    }
                    name="actors_ids"
                    isMulti
                    options={actorOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="actresses_ids">
                    Select Actress
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'actresses_ids',
                        value: selectedOptions,
                      })
                    }
                    name="actresses_ids"
                    isMulti
                    options={actressOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="south_actor_ids">
                    Select South Actor
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'south_actor_ids',
                        value: selectedOptions,
                      })
                    }
                    name="south_actor_ids"
                    isMulti
                    options={southActorOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="tags_ids">
                    Select Tag
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'tags_ids',
                        value: selectedOptions,
                      })
                    }
                    name="tags_ids"
                    isMulti
                    options={tagOptions}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="seasons_ids">
                    Select Seasons
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'seasons_ids',
                        value: selectedOptions,
                      })
                    }
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
              onClick={addMovieFunc}
              disabled={disabled}
              className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
            >
              Add
            </button>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
}
