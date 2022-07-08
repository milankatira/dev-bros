import React, { useState } from "react";
import CandidateGroupModal from "../../components/admin/common/CandidateGroupModal";
import SingleCandidateModal from "../../components/admin/common/SingleCandidateModal";
import axios from "axios";
import Accordion from "../../components/admin/group-list/Accordian";
const Grouplist = ({ GroupData }) => {
  console.log(GroupData, "GroupData");
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
        <div className="container px-5 py-24 mx-auto">
          <section className="text-gray-600 body-font">
            <div className="container pb-24 mx-auto">
              <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                  Slow-carb next level shoindxgoitch ethical authentic,
                  scenester sriracha forage.
                </h1>
                <button
                  onClick={handleAddGroupModal}
                  className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                >
                  AddEXAM
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section>
        list of group
        {GroupData.group.map((item, index) => (
          <>
            <Accordion content={item} title={item.name} isPast={false} />
          </>
        ))}
      </section>
      {/* <CandidateGroupModal
        // exam_id={exam_id}
        open={openModal}
        toggleModal={toggleModal}
        handleAddGroupModal={handleAddGroupModal}
      /> */}

      <SingleCandidateModal
        // exam_id={exam_id}
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
