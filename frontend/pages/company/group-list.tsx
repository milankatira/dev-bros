import React, { useState } from "react";
import CandidateGroupModal from "../../components/admin/common/CandidateGroupModal";
import SingleCandidateModal from "../../components/admin/common/SingleCandidateModal";
import axios from "axios";
// import Accordion from "../../components/admin/group-list/Accordian";
import dynamic from "next/dynamic";
const Accordion = dynamic(
  () => import("../../components/admin/group-list/Accordian"),
  {
    ssr: false,
  }
);

const Grouplist = ({ GroupData }) => {
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleAddGroupModal = () => {
    setIsGroup(true);
    setshowModal(true);
    // setOpenModal(true);
  };

  // const displayModal = () => setshowModal(!showModal);
  const displayModal = () => setshowModal(!showModal);
  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div>
      <section className="text-gray-600 body-font">
          <div className="px-20 py-4 mx-auto w-full">
          <section className="text-gray-600 body-font">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                <h1 className="flex-grow text-2xl font-medium title-font text-gray-900">
                  Grouplist
                </h1>
                <button
                  onClick={handleAddGroupModal}
                  className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                >
                  Add Group
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-20">
        <h4 className="font-bold">list of group</h4>
        {GroupData.group.map((item, index) => (
          <>
            <Accordion content={item} title={item.name} isPast={false} />
          </>
        ))}
      </section>

      <SingleCandidateModal
        isGroup={isGroup}
        open={showModal}
        toggleModal={displayModal}
        setModal={setshowModal}
        exam_id={undefined} // isGroup={isGroup}
      />
    </div>
  );
};

export default Grouplist;

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/group", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  const data = await res.data;

  return { props: { GroupData: data } };
}
