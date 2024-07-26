import React, { useEffect, useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { inputStyle, labelStyle } from '../utilities/Input';
import { info_toaster, success_toaster } from '../utilities/Toaster';
import Select from 'react-select';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { PutAPI } from '../utilities/PutAPI';

export default function EditMovie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location?.state || {};
  const categories = GetAPI('categories');
  const actors = GetAPI('actors');
  const actress = GetAPI('actress');
  const quality = GetAPI('quality');
  const southActors = GetAPI('southactor');

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

  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addMovie, setAddMovie] = useState({
    title: movie.title,
    thumbnail: null,
    images: [],
    meta_description: movie.meta_description,
    description: movie.description,
    download_link1: movie.download_link1,
    download_link2: movie.download_link2,
    download_link3: movie.download_link3,
    iframe_link1: movie.iframe_link1,
    iframe_link2: movie.iframe_link2,
    iframe_link3: movie.iframe_link3,
    year: movie.year,
    duration: movie.duration,
    director: movie.director,
    uploadBy: movie.uploadBy,
    category_ids: movie.categories,
    quality_ids: movie.quality,
    actors_ids: movie.actors,
    actresses_ids: movie.actresses,
    south_actor_ids: movie.south_actor,
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
            option.value?.toString(),
          )
        : e?.target?.value;
      setAddMovie({ ...addMovie, [e.target?.name]: value });
    } else {
      const { name, value } = e;
      setAddMovie((prevState) => ({
        ...prevState,
        [name]: value.map((option) => option.value?.toString()),
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
      iframe_link1,
      iframe_link2,
      iframe_link3,
      category_ids,
      quality_ids,
      actors_ids,
      actresses_ids,
      south_actor_ids,
    } = addMovie;

    if (title === '') {
      info_toaster('Please Enter Title');
    } else if (description === '') {
      info_toaster('Please Enter description');
    } else {
      // const formData = new FormData();
      // formData.append('title', title);
      // formData.append('description', description);
      // formData.append('meta_description', meta_description);
      // formData.append('download_link1', download_link1);
      // formData.append('download_link2', download_link2);
      // formData.append('download_link3', download_link3);
      // formData.append('iframe_link1', iframe_link1);
      // formData.append('iframe_link2', iframe_link2);
      // formData.append('iframe_link3', iframe_link3);
      // formData.append('year', year);
      // formData.append('duration', duration);
      // formData.append('director', director);
      // formData.append('uploadBy', uploadBy);
      try {
        let res = await PutAPI(`movie/${movie?.id}`, {
          title,
          description,
          meta_description,
          year,
          duration,
          director,
          uploadBy,
          download_link1,
          download_link2,
          download_link3,
          iframe_link1,
          iframe_link2,
          iframe_link3,
        });
        console.log(res);
        if (res?.data?.status === true) {
          success_toaster(res?.data?.message);
          navigate('/');
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
                    value={addMovie?.title}
                    onChange={onChange}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Movie Name"
                    className={inputStyle}
                  />
                </div>
                {/* <div className="space-y-1 w-full">
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
                </div> */}
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
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="year">
                    Year
                  </label>
                  <input
                    value={addMovie?.year}
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
              {/* <div className="flex gap-x-4">
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
              </div> */}
              {/* <div className="flex gap-4">
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
              </div> */}
              {/* <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="actorOptions">
                    Select Actors
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'actorOptions',
                        value: selectedOptions,
                      })
                    }
                    name="actorOptions"
                    isMulti
                    options={actorOptions}
                  />
                </div>
              </div> */}
              {/* <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="actressOptions">
                    Select Actress
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'actressOptions',
                        value: selectedOptions,
                      })
                    }
                    name="actressOptions"
                    isMulti
                    options={actressOptions}
                  />
                </div>
              </div> */}
              {/* <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="southActorOptions">
                    Select South Actor
                  </label>
                  <Select
                    onChange={(selectedOptions) =>
                      onChange({
                        name: 'southActorOptions',
                        value: selectedOptions,
                      })
                    }
                    name="southActorOptions"
                    isMulti
                    options={southActorOptions}
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex justify-end gap-x-2 mt-5">
            <button
              type="submit"
              onClick={addMovieFunc}
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
