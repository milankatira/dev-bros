import React, { useCallback, useEffect, useRef, useState } from "react";
import AddExamModal from "../../../components/admin/common/AddExamModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import axios from "axios";
import useInfiniteScroll from "../../../hook/useInfinateScroll";
import useBookSearch from "../../../hook/fetchHook";
import { deleteExam, GetAllExam } from "../../../api/client/exam";
import Link from "next/link";
import Router from "next/router";
import Swal from "sweetalert2";
import BasicTextinput from "../../../components/common/design/BasicTextInput";
import BasicSelectField from "../../../components/common/design/BasicSelectField";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchExamType, setSearchExamType] = useState("");
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        deleteExam(id);
        Swal.fire(
          "Deleted!",
          "Poof! Your imaginary file has been deleted!",
          "success"
        );
      } else {
        Swal.fire("Cancelled", "Your Exam is not deleted!");
      }
    });
  };

  const onFormSubmit = () => {   
      GetAllExam({ name: searchTerm, type: searchExamType.toUpperCase() });
  };

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
                  My exam
                </h1>
                <button
                  className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mt-10 sm:mt-0"
                  onClick={() => setOpenAddExamModal(true)}
                >
                  AddEXAM
                </button>
              </div>
            </div>
          </section>

          <section className="text-gray-600 body-font my-2">
            <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <BasicTextinput
                  text="exam name"
                  name={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative flex-grow w-full">
                <BasicSelectField
                  inputLabel="examType"
                  options={["mcq", "coding"]}
                  defaultValue={searchExamType}
                  onChange={(e) => setSearchExamType(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  className="mb-4 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  onClick={() => onFormSubmit()}
                >
                  Button
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap justify-center">
            {books &&
              books.length &&
              books?.map((book, index) => {
                if (books.length === index + 1) {
                  return (
                    <div
                      className="lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-red-600"
                      ref={lastBookElementRef}
                      key={book}
                      onClick={() => {
                        Router.push(`exam/${book._id}`);
                      }}
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
                  );
                } else {
                  return (
                    <Link href={`exam/${book._id}`}>
                      <div
                        className="lg:w-1/5 md:w-1/2 p-4 w-full m-4 shadow-lg"
                        key={book}
                      >
                        <div>
                          <div className="flex w-full justify-between">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                              {book.exam_type}
                            </h3>

                            <svg
                              onClick={(event) => {
                                event.stopPropagation(), handleDelete(book._id);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="h-4 w-4"
                            >
                              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                            </svg>
                          </div>

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
