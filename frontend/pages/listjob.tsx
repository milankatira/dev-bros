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
          {jobData &&
            jobData.map((job, index) => {
              return (
                <Listjob key={index} job={job}/>
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
