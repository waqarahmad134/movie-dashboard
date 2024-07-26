import React, { useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { DeleteAPI } from '../utilities/DelAPI';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { info_toaster, success_toaster, warning_toaster } from '../utilities/Toaster';
import { inputStyle, labelStyle } from '../utilities/Input';
import { IoTrash } from 'react-icons/io5';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function Manager() {
  const { data, reFetch } = GetAPI('users');
  const [loader, setLoader] = useState(false);
  const [manager, setManager] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'manager',
  });

  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setManager({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  };

  const onChange = (e) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };
  const addManager = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, role, password } = manager;
    if (manager.name === '') {
      info_toaster("Please Enter manager's name");
    } else {
      setLoader(true);
      let res = await PostAPI('users', {
        first_name,
        last_name,
        email,
        role,
        password,
      });
      if (res?.data?.status === true) {
        reFetch();
        success_toaster(res?.data?.message);
        setAddModal(false);
        setLoader(false);
        setManager({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          role : 'manager'
        });
      } else {
        setLoader(false);
        warning_toaster(res?.data?.errors?.password?.[0]);
        warning_toaster(res?.data?.errors?.email?.[0]);
      }
    }
  };

  const deleteManager = async (id) => {
    let res = await DeleteAPI(`users/${id}`);
    if (res?.data?.status === true) {
      reFetch();
      success_toaster(res?.data?.message);
    } else {
      warning_toaster(res?.data?.message);
    }
  };
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="All Complains" />
        <button
          onClick={() => setAddModal(true)}
          className="py-2.5 px-4 rounded bg-black text-white font-medium border mb-6"
        >
          Add New Manager
        </button>
        <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <form>
              <ModalHeader>
                <h1 className="text-center">Add Manager</h1>
              </ModalHeader>
              <ModalCloseButton />
              {loader ? (
                <div className="h-[160px]">Loading</div>
              ) : (
                <ModalBody>
                  <div className="min-h-40">
                    <div className="space-y-1">
                      <label className={labelStyle}>First Name</label>
                      <input
                        value={manager?.first_name}
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
                        value={manager?.last_name}
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
                        value={manager?.email}
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
                        value={manager?.password}
                        onChange={onChange}
                        name="password"
                        type="text"
                        placeholder="password"
                        className={inputStyle}
                      />
                    </div>
                  </div>
                </ModalBody>
              )}
              <ModalFooter>
                <div className="flex justify-end gap-x-2">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="py-2.5 w-24 rounded font-medium text-sm text-themePurple border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={addManager}
                    className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
                  >
                    Add
                  </button>
                </div>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      No
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      First Name
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Last Name
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data
                    ?.filter((item) => item?.role !== 'admin')
                    .map((data, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {key + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {data?.first_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {data?.last_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {data?.email}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {data?.role}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              onClick={() => deleteManager(data?.id)}
                              className="hover:text-primary cursor-pointer"
                            >
                              <IoTrash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}
