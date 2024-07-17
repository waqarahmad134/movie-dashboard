import React, { useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { inputStyle, labelStyle } from '../utilities/Input';
import { info_toaster, success_toaster } from '../utilities/Toaster';
import Select from 'react-select';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

export default function AddMovie() {
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
    title: '',
    thumbnail: null,
    meta_description: '',
    description: '',
    download_link1: '',
    download_link2: '',
    download_link3: '',
    iframe_link1: '',
    iframe_link2: '',
    iframe_link3: '',
    year: '',
    duration: '',
    director: '',
    category_ids: [],
    quality_ids: [],
    actors_ids: [],
    actresses_ids: [],
    south_actor_ids: [],
});

  const onChange = (e) => {
    if (e?.target?.type === 'file') {
      setAddMovie({ ...addMovie, [e.target.name]: e.target.files[0] });
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
      meta_description,
      year,
      duration,
      director,
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
      formData.append('iframe_link1', iframe_link1);
      formData.append('iframe_link2', iframe_link2);
      formData.append('iframe_link3', iframe_link3);
      formData.append('thumbnail', thumbnail);
      formData.append('year', year);
      formData.append('duration', duration);
      formData.append('director', director);
      category_ids.forEach((id) => formData.append('category_ids[]', id));
      quality_ids.forEach((id) => formData.append('quality_ids[]', id));
      actors_ids.forEach((id) => formData.append('actors_ids[]', id));
      actresses_ids.forEach((id) => formData.append('actresses_ids[]', id));
      south_actor_ids.forEach((id) => formData.append('south_actor_ids[]', id));
      try {
        let res = await PostAPI('add-movie', formData);
        if (res?.data?.status === true) {
          setLoader(false);
          success_toaster(res?.data?.message);
          setAddMovie({
            title: '',
            thumbnail: null,
            meta_description: '',
            description: '',
            download_link1: '',
            download_link2: '',
            download_link3: '',
            iframe_link1: '',
            iframe_link2: '',
            iframe_link3: '',
            year: '',
            duration: '',
            director: '',
            category_ids: [],
            quality_ids: [],
            actors_ids: [],
            actresses_ids: [],
            south_actor_ids: [],
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
                    className={inputStyle}
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
                    Download Link
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
              </div>
              <div className="flex gap-4">
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
              </div>
              <div className="flex gap-4">
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
