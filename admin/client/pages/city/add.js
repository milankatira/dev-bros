import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/sidebar";

const add = () => {
  const [city, setcity] = useState("");
  return (
    <div>
      <Sidebar />
      <div class="flex justify-center relative md:ml-64 bg-sky-100">
        <div class="mb-3 xl:w-96">
          <label
            for="exampleText0"
            class="form-label inline-block mb-2 text-gray-700"
          >
            City
          </label>
          <input
            value={city}
            onChange={(e) => setcity(e.target.value)}
            type="text"
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleText0"
            placeholder="Enter city"
          />

          <button
            className=" mt-3 bg-blue-700 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() =>
              axios.post(
                "http://localhost:3001/api/city",
                { name: city },
                { withCredentials: true }
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default add;
