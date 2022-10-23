import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Sidebar from "../components/layout/sidebar";
const dashboard = ({ city }) => {
  console.log(city, "city");
  const [check, setcheck] = useState();
  const [List, setList] = useState(city);
  const [MasterChecked, setMasterChecked] = useState();
  const [SelectedList, setSelectedList] = useState();
  console.log(city);
  const onMasterCheck = (e) => {
    console.log("ch", e.target.checked);
    setcheck(e.target.checked);
    let tempList = List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    // this.setState({
    setMasterChecked(e.target.checked),
      setList(tempList),
      setSelectedList(List.filter((e) => e.selected));
    // });
  };

  let ListData = [];
  const onItemCheck = (e, item) => {
    console.log(e, item, "mk");
    setcheck(e.target.checked);
    ListData.push(item);
    console.log(ListData, "List");

    // // setcheck(e.target.value)
    // let tempList = List;
    // tempList.map((user) => {
    //   if (user.id === item._id) {
    //     user.selected = e.target.checked;
    //   }
    //   return user;
    // });

    // //To Control Master Checkbox State
    // const totalItems = List.length;
    // const totalCheckedItems = tempList.filter((e) => e.selected).length;
    // console.log("totalItems", totalItems);
    // console.log("totalCheckedItems", totalCheckedItems);
    // // Update State
    // // this.setState({
    // setMasterChecked(totalItems === totalCheckedItems);
    // setList(tempList);
    // // setSelectedList(List.filter((e) => e.selected));
    // // });
  };

  // Event to get selected rows(Optional)
  const getSelectedRows = () => {
    // setSelectedList(List.filter((e) => e.selected));
  };

  getSelectedRows();

  console.log(SelectedList, "selected");

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-sky-100">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-between p-4">
            <h1 className="text-blue-600 mt-3 text-4xl font-medium">City</h1>
            <button
              className=" mt-3 bg-blue-700 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => Router.push("/city/add")}
            >
              Create new
            </button>
          </div>
          <div class="p-4">
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={MasterChecked}
                onChange={(e) => onItemCheck(e, data)}
                // onChange={(e) => console.log("DDDD")}
              />
            </div>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      // checked={user.selected}
                      // onChange={(e) => onItemCheck(e, user)}

                      // onChange={(e) => onItemCheck(e)}
                      value={MasterChecked}
                      onChange={(e) => onMasterCheck(e)}
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  name
                </th>
                <th scope="col" class="px-6 py-3">
                  id
                </th>

                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {city?.map((data) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        {MasterChecked ? (
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={MasterChecked}
                            onChange={(e) => onItemCheck(e, data)}
                          />
                        ) : (
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            // checked={MasterChecked ? MasterChecked : ""}
                            onChange={(e) => onItemCheck(e, data)}
                          />
                        )}

                        <label for="checkbox-table-search-1" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {data?.name}
                    </th>
                    <td class="px-6 py-4">{data?._id}</td>
                    <td class="px-6 py-4 text-right">
                      <Link href={`/city/${data?._id}`}>
                        <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default dashboard;

export async function getServerSideProps({ req, res }) {
  let city = await axios.get("http://localhost:3001/api/city");
  return {
    props: { city: city?.data?.city },
  };
}
