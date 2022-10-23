import React from "react";
import axios from "axios";

const Listjob = ({ job }) => {
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-gray-700">CATEGORY</span>
        <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          {job.title}
        </h2>

        <h2>{job.description}</h2>
        <p className="leading-relaxed">
          {job.description}
          Glossier echo park pug, church-key sartorial biodiesel vexillologist
          pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag
          selfies, poke vaporware kombucha lumbersexual pork belly polaroid
          hoodie portland craft beer.
        </p>

        <a className="text-purple-500 inline-flex items-center mt-4">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const listJob = ({ jobData }) => {
  console.log(jobData, "job");

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="shadow p-5 rounded-lg bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by listing, location, bedroom number..."
                className="px-8 mr-10 pr-10 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Filters</p>

              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                Reset Filter
              </button>
            </div>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">All Type</option>
                  <option value="for-rent">For Rent</option>
                  <option value="for-sale">For Sale</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Furnish Type</option>
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="partially-furnished">
                    Partially Furnished
                  </option>
                  <option value="not-furnished">Not Furnished</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Any Price</option>
                  <option value="1000">RM 1000</option>
                  <option value="2000">RM 2000</option>
                  <option value="3000">RM 3000</option>
                  <option value="4000">RM 4000</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Floor Area</option>
                  <option value="200">200 sq.ft</option>
                  <option value="400">400 sq.ft</option>
                  <option value="600">600 sq.ft</option>
                  <option value="800 sq.ft">800</option>
                  <option value="1000 sq.ft">1000</option>
                  <option value="1200 sq.ft">1200</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Bedrooms</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4 bedrooms</option>
                  <option value="5">5 bedrooms</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Bathrooms</option>
                  <option value="1">1 bathroom</option>
                  <option value="2">2 bathrooms</option>
                  <option value="3">3 bathrooms</option>
                  <option value="4">4 bathrooms</option>
                  <option value="5">5 bathrooms</option>
                </select>

                <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                  <option value="">Bathrooms</option>
                  <option value="1">1 space</option>
                  <option value="2">2 space</option>
                  <option value="3">3 space</option>
                </select>
              </div>
            </div>
          </div>

          {jobData &&
            jobData.map((job, index) => {
              return (
                <div key={index}>
                  <Listjob key={index} job={job} />;
                </div>
              );
            })}
          <div className="-my-8 divide-y-2 divide-gray-100"></div>
        </div>
      </section>
    </div>
  );
};

export default listJob;

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/get-job", {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const data = await res.data;
  return { props: { jobData: data.jobs } };
}
