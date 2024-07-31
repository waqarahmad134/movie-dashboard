import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { PutAPI } from '../utilities/PutAPI';
import { inputStyle, labelStyle } from '../utilities/Input';
import { info_toaster, success_toaster } from '../utilities/Toaster';
import Select from 'react-select';

export default function EditMovie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location?.state || {};

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
    iframe_link1: movie.iframe_link1,
    iframe_link2: movie.iframe_link2,
    iframe_link3: movie.iframe_link3,
    year: movie.year,
    duration: movie.duration,
    director: movie.director,
    uploadBy: movie.uploadBy,
  });
  console.log(editMovie)

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
      iframe_link1,
      iframe_link2,
      iframe_link3,
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
    formData.append('iframe_link1', iframe_link1 || '');
    formData.append('iframe_link2', iframe_link2 || '');
    formData.append('iframe_link3', iframe_link3 || '');
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
    try {
      let res = await PostAPI(`update-movie/${movie?.id}`, formData);
      if (res?.data?.status === true) {
        success_toaster(res?.data?.message);
        navigate('/');
      } else {
        success_toaster(res?.data?.message);
      }
    } catch (error) {
      console.log("🚀 ~ editMovieFunc ~ error:", error)
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
              </div>
              <div className="flex gap-4">
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
              </div>
              <div className="flex gap-4">
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
