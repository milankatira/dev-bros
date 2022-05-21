import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "../../components/layout/sidebar";
const city = ({ city }) => {
  const [City, setcity] = useState(city.name);
  console.log(city, "city by id");
  const router = useRouter();
  const { _id } = router.query;

  console.log(_id);
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
            value={City}
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
              axios.put(`http://localhost:8000/api/v1/city/${_id}`, { name: City })
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default city;

export async function getServerSideProps(context) {
  let city = await axios.get(
    `http://localhost:8000/api/v1/city/${context.query._id}`
  );
  return {
    props: { city: city?.data?.city },
  };
}
