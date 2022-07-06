import React, { useCallback, useEffect, useRef, useState } from "react";
import AddExamModal from "../../../components/admin/common/AddExamModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import axios from "axios";
import useInfiniteScroll from "../../../hook/useInfinateScroll";
import useBookSearch from "../../../hook/fetchHook";
import { GetAllExam } from "../../../api/client/exam";
import Link from "next/link";
const Index = () => {
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

  const [openAddExamModal, setOpenAddExamModal] = useState(false);
  const [examDataForModal, setExamDataForModal] = useState<any>(initialValues);
  const toggleModal = () => setOpenAddExamModal(!openAddExamModal);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://localhost:4000/api/exam",
      params: { itemsPerPage: 10, offset: (pageNumber - 1) * 10 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data.exam, "Ss");
        setBooks((prevBooks) => {
          return [
            ...new Set([...prevBooks, ...res.data.exam.map((b: any) => b)]),
          ];
        });
        setHasMore(res.data.exam.length >= 10);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <section className="text-gray-600 body-font">
            <div className="container pb-24 mx-auto">
              <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                  Slow-carb next level shoindxgoitch ethical authentic,
                  scenester sriracha forage.
                </h1>
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  onClick={() => setOpenAddExamModal(true)}
                >
                  AddEXAM
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap -m-4">
            {books &&
              books.length &&
              books?.map((book, index) => {
                if (books.length === index + 1) {
                  return (
                    <Link href={`exam/${book._id}`}>
                      <div
                        className="lg:w-1/4 md:w-1/2 p-4 w-full"
                        ref={lastBookElementRef}
                        key={book}
                      >
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/428x268"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            {book.exam_type}
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            {book.exam_name}
                          </h2>
                          <p className="mt-1">{book.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  return (
                    <Link href={`exam/${book._id}`}>
                      <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={book}>
                        <a className="block relative h-48 rounded overflow-hidden">
                          <img
                            alt="ecommerce"
                            className="object-cover object-center w-full h-full block"
                            src="https://dummyimage.com/428x268"
                          />
                        </a>
                        <div className="mt-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            {book.exam_type}
                          </h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">
                            {book.exam_name}
                          </h2>
                          <p className="mt-1">{book.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            <div>{loading && "Loading..."}</div>
            <div>{error && "Error"}</div>
          </div>
        </div>
      </section>

      <AddExamModal
        open={openAddExamModal}
        toggleModal={toggleModal}
        setExamData={setExamDataForModal}
        examData={examDataForModal}
      />
    </div>
  );
};

export default Index;
