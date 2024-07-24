import React, { useState } from 'react';
import GetAPI from '../utilities/GetAPI';
import { PostAPI } from '../utilities/PostAPI';
import { DeleteAPI } from '../utilities/DelAPI';
import { PutAPI } from '../utilities/PutAPI';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FaEdit } from 'react-icons/fa';
import { IoTrash } from 'react-icons/io5';
import { inputStyle, labelStyle } from '../utilities/Input';
import {
  error_toaster,
  info_toaster,
  success_toaster,
  warning_toaster,
} from '../utilities/Toaster';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../utilities/URL';

export default function Actress() {
  const { data, reFetch } = GetAPI('actress');
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [actress, setActress] = useState({
    name: '',
  });
  const [updateActress, setUpdateActress] = useState({
    name: '',
    id: '',
  });
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setActress({
      name: '',
    });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateActress({
      name: '',
      id: '',
    });
  };
  const onChange = (e) => {
    setActress({ ...actress, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setUpdateActress({ ...updateActress, [e.target.name]: e.target.value });
  };

  const actressFunc = async (e) => {
    e.preventDefault();
    if (actress.name === '') {
      info_toaster("Please Enter actress's name");
    } else {
      setLoader(true);
      let res = await PostAPI('actress', {
        name: actress.name,
      });
      if (res?.data?.status === true) {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddModal(false);
        setActress({
          name: '',
        });
      } else {
        setLoader(false);
        info_toaster(res?.data?.message);
      }
    }
  };

  const updateActressFunc = async (e) => {
    e.preventDefault();
    if (updateActress.name === '') {
      info_toaster('Please enter your UpdateName');
    } else {
      setLoader(true);
      let res = await PutAPI(`actress/${updateActress.id}`, {
        name: updateActress.name,
      });
      if (res?.data?.status === true) {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setUpdateActress({
          name: '',
          id: '',
        });
      } else {
        setLoader(false);
        warning_toaster(res?.data?.message);
      }
    }
  };

  const deleteactress = async (id) => {
    setDisabled(true);
    let res = await DeleteAPI(`actress/${id}`);
    if (res?.data?.status === true) {
      reFetch();
      success_toaster(res?.data?.message);
      setDisabled(false);
    } 
    else {
      warning_toaster(res?.data?.message);
      setDisabled(false);
    }
  };

  function handleStatus(id) {
    axios.get(BASE_URL + `actress/${id}`).then((dat) => {
      if (dat?.data?.status === '1') {
        reFetch();
        info_toaster(dat?.data?.message);
      } else {
        error_toaster(dat?.data?.message);
      }
    });
  }

  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="All actress" />
        <button
          onClick={() => setAddModal(true)}
          className="py-2.5 px-4 rounded bg-black text-white font-medium border mb-6"
        >
          Add New actress
        </button>
        <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <form>
              <ModalHeader>
                <h1 className="text-center">Add actress</h1>
              </ModalHeader>
              <ModalCloseButton />
              {loader ? (
                <div className="h-[160px]">Loading</div>
              ) : (
                <ModalBody>
                  <div className="h-40">
                    <div className="space-y-1">
                      <label className={labelStyle} htmlFor="name">
                        Product actress Name
                      </label>
                      <input
                        value={actress?.name}
                        onChange={onChange}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Product actress Name"
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
                    onClick={actressFunc}
                    disabled={disabled}
                    className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
                  >
                    Add
                  </button>
                </div>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Modal
          onClose={closeUpdateModal}
          isOpen={updateModal}
          size="xl"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <form>
              <ModalHeader>
                <h1 className="text-center">Update Product actress</h1>
              </ModalHeader>
              <ModalCloseButton />
              {loader ? (
                <div className="h-[160px]">Loading</div>
              ) : (
                <ModalBody>
                  <div className="h-40">
                    <div className="space-y-1">
                      <label className={labelStyle} htmlFor="updateName">
                        name
                      </label>
                      <input
                        value={updateActress?.name}
                        onChange={onChange2}
                        type="text"
                        name="name"
                        id="updateName"
                        placeholder="Product actress Name"
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
                    onClick={closeUpdateModal}
                    className="py-2.5 w-24 rounded font-medium text-sm text-themePurple border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={updateActressFunc}
                    disabled={disabled}
                    className="py-2.5 w-24 rounded font-medium text-sm text-white bg-graydark border"
                  >
                    Update
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
                      name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((data, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {key + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data?.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <button
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            data.status === true
                              ? 'bg-success text-success'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {data.status === true ? 'Active' : 'Block'}
                        </button>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => deleteactress(data?.id)}
                            className="hover:text-primary cursor-pointer"
                          >
                            <IoTrash size={20} />
                          </button>
                          <button
                            onClick={() => {
                              setUpdateModal(true);
                              setUpdateActress({
                                name: data?.name,
                                id: data?.id,
                              });
                            }}
                            className="hover:text-primary"
                          >
                            <FaEdit size={20} />
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
