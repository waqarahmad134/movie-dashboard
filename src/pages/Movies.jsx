import React from 'react';
import GetAPI from '../utilities/GetAPI';
import DefaultLayout from '../layout/DefaultLayout';
import TableThree from '../components/Tables/TableThree';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


import { Link } from 'react-router-dom';

export default function Movies() {
  const { data } = GetAPI('all-movies');
  console.log("🚀 ~ Movies ~ data:", data?.data)


  
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
        <TableThree data={data?.data} />
      </div>
    </DefaultLayout>
  );
}
