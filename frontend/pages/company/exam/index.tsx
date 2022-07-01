import React, { useCallback, useRef, useState } from "react";
import AddExamModal from "../../../components/admin/common/AddExamModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import axios from "axios";
import useInfiniteScroll from "../../../hook/useInfinateScroll";
import useBookSearch from "../../../hook/fetchHook";
import { GetAllExam } from "../../../api/client/exam";
import Link from "next/link";
const Index = ({ Data }) => {
  console.log(Data, "dataa");
  const initialValues = {
    exam_name: "",
    start_time: "",
    end_time: "",
    description: "",
    exam_type: "",
    date: "",
    passing_mark: "",
    total_mark: " ",
    totalQuestion: " ",
  };

  const [openAddExamModal, setOpenAddExamModal] = useState(true);
  const [examDataForModal, setExamDataForModal] = useState<any>(initialValues);
  const toggleModal = () => setOpenAddExamModal(!openAddExamModal);
  const [IsFetching, setIsFetching] = useState(false);
  const [Page, setPage] = useState(0);
  const [HasMore, setHasMore] = useState(10);

    const [pageNumber, setPageNumber] = useState(1);

    // const { books, hasMore, loading, error } = useBookSearch(pageNumber);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Data.exam.map((exam: any) => {
              console.log(exam, "exam");
              return (
                <>
                  <Link href={`exam/${exam._id}`}>
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                      <a className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src="https://dummyimage.com/428x268"
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {exam.exam_type}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {exam.exam_name}
                        </h2>
                        <p className="mt-1">{exam.description}</p>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

export const getServerSideProps = async ({ req }) => {
  const res = await axios.get("http://localhost:4000/api/exam", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });

  const data = await res.data;
  return { props: { Data: data } };
};
