
// import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import QuestionDetail from "./Question/QuestionDetail";
//import Axios from "../../axios";
import { HiArrowNarrowRight } from 'react-icons/hi';
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import Axios from "../../axios";

// Styled Components
const Container = styled.section`
  /* Add any container styles here */
`;

const HeaderRow = styled.div`
  /* Add styles for the header row here */
`;

const AskQuestionButton = styled.button`
  /* Add styles for the "Ask Question" button here */
  background-color: blue;
  color: white;
  border: 1px solid blue;
 padding: 10px;
 padding: 120px 20px 30px;
  font-size: 2rem;
  display: flex;
  justify-content: space-between
  align-items: center;
  &:hover {
    background-color: pink;
    border-color: pink;
  }
`;

const Header = styled.h1`
  /* Add styles for the header here */
`;

const SearchInput = styled.input`
  /* Add styles for the search input here */
  /* Add any other styles you want for the input here */
`;

const Home = () => {
  const [userData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const axios = Axios();
  const [search, setSearcher] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    } else {
      loadQuestions();
    }
  }, [userData.user]);

  async function loadQuestions() {
    const response = await axios.get(
      "/api/question/getquestions",
      userData.config
    );
    setQuestions(response.data?.data);
  }

  const handleClick = () => {
    navigate("/newquestion");
  };

  useEffect(() => {
    setFilterData(
      questions.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, questions]);

  return (
    <Container>
      <HeaderRow>
        <AskQuestionButton onClick={handleClick}>
          Ask Question
          <HiArrowNarrowRight className='ml-3' />
        </AskQuestionButton>
        <Header>Welcome to Evangadi Forum: {userData.user?.display_name}</Header>
      </HeaderRow>
      <div className="flex justify-between">
        <h2>Questions</h2>
        <SearchInput
          type="search"
          className="form-control block w-full px-2 py-2 text-base font-normal text-orange-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-orange-700 focus:bg-white focus:border-blue-200 focus:outline-none"
          id="exampleSearch"
          placeholder="Search Title"
          onChange={(e) => setSearcher(e.target.value)}
        />
      </div>
      <div>
        {filterData.map((quest) => (
          <QuestionDetail question={quest} key={quest._id} />
        ))}
        {filterData.length === 0 && <div>No Questions Found</div>}
      </div>
    </Container>
  );
};

export default Home;
