import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { inputStyle, labelStyle } from '../utilities/Input';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { success_toaster, warning_toaster } from '../utilities/Toaster';
import { PutAPI } from '../utilities/PutAPI';
import { BASE_URL } from '../utilities/URL';
import axios from 'axios';

const Profile = () => {
  const { data, reFetch } = GetAPI('users');
  const adminDetails = data?.data?.find((data) => data?.role === 'admin');
  const [admin, setAdmin] = useState({
    first_name: adminDetails?.first_name,
    last_name: adminDetails?.last_name,
    email: adminDetails?.email,
    password: '',
  });

  useEffect(() => {
    if (data && data.data) {
      const adminDetails = data.data.find((user) => user.role === 'admin');
      if (adminDetails) {
        setAdmin({
          first_name: adminDetails?.first_name,
          last_name: adminDetails?.last_name,
          email: adminDetails?.email,
          password: '',
        });
      }
    }
  }, [data]);

  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const updateAdmin = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = admin;
    if (admin.name === '') {
      info_toaster("Please Enter admin's name");
    } else if (admin.email === '') {
      info_toaster('Please Enter Email');
    } else {
      try {
        const res = await axios.put(`${BASE_URL}users/${adminDetails?.id}`, {
          first_name,
          last_name,
          email,
          password,
        });
        if (res?.data?.status === true) {
          reFetch();
          success_toaster(res?.data?.message);
        } else {
          warning_toaster(res?.data?.error || 'An error occurred while updating the profile.');
        }
      } catch (error) {
        warning_toaster(error.response?.data?.message || 'An unexpected error occurred.');
      }
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div>
        <form onSubmit={updateAdmin}>
          <div className="min-h-40">
            <div className="space-y-1">
              <label className={labelStyle}>First Name</label>
              <input
                value={admin?.first_name}
                onChange={onChange}
                name="first_name"
                type="text"
                placeholder="First Name"
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Last Name</label>
              <input
                value={admin?.last_name}
                onChange={onChange}
                name="last_name"
                type="text"
                placeholder="Last Name"
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Email</label>
              <input
                value={admin?.email}
                onChange={onChange}
                name="email"
                type="text"
                placeholder="Email"
                className={inputStyle}
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Password</label>
              <input
                value={admin?.password}
                onChange={onChange}
                name="password"
                type="text"
                placeholder="password"
                className={inputStyle}
              />
            </div>
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
