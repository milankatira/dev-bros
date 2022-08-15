import React from 'react'
import axios from 'axios'
const allQuestions = ({Data}) => {
  return (
    <div>allQuestions</div>
  )
}

export default allQuestions

export async function getServerSideProps({ req ,query}) {
  const res = await axios.get(`http://localhost:4000/api/questions/${query.exam_id}`, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  const data = await res.data;
  return { props: { Data: data } };
}
