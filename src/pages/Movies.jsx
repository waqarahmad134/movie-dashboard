import React from 'react';
import GetAPI from '../utilities/GetAPI';
import DefaultLayout from '../layout/DefaultLayout';
import TableThree from '../components/Tables/TableThree';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import { DeleteAPI } from '../utilities/DelAPI';
import { success_toaster, warning_toaster } from '../utilities/Toaster';

export default function Movies() {
  const { data, reFetch } = GetAPI('all-movies');

  const deleteMovie = async (id) => {
    try {
      const res = await DeleteAPI(`movie/${id}`);
      if (res?.data?.status) {
        reFetch();
        success_toaster(res?.data?.message);
      } else {
        warning_toaster(res?.data?.message);
      }
    } catch (error) {
      warning_toaster('Failed to delete movie');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Movies" />
      <Link
        to={'/add-movie'}
        className="inline-flex py-2.5 px-4 rounded bg-black text-white font-medium border mb-6"
      >
        Add New Movie
      </Link>

      <div className="flex flex-col gap-10">
        <TableThree data={data?.data} deleteMovie={deleteMovie} />
      </div>
    </DefaultLayout>
  );
}
