import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import KakaoMap from "../pages/KakaoMap";
const StyledBoardList = styled.div`
padding: 20px;
margin: 20px;
text-align: center;

h1 {
  font-size: 24px;
}

table {
    width: 70%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left:auto; 
    margin-right:auto;
  }

  td {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    padding: 3%;
    text-align: center;
  }

  th {
    //background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    border-top: 2px solid;
    padding: 2%;
    text-align: center;
  }

  .button {
    margin: 20px;
    display: inline-block;
    padding: 10px;
    background-color: #FFC0CB;
    color: #fff;
    text-decoration: none;
    margin-right: 10px;

    &:hover {
      background-color: #45a049;
    }
  }
`;
const ButtonContainer = styled.div`
  margin-top: 20px;

  button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #FFC0CB;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const BoardList = () => {
  const [board, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const fetchBoards = async (page) => {
    try {
      const response = await axios.get(`/board/BoardList?page=${page}`);
      setBoards(response.data.list.content);
      setTotalPages(response.data.list.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);
  
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <StyledBoardList>
      <h1>공지사항</h1>
      <table>
        <thead>
          <tr>
            <th> NO </th>
            <th>공지제목</th>
            <th>유형</th>
            <th>조회수</th>
            <th>날 짜</th>
          </tr>
        </thead>
        <tbody>
          {board.map((list, index) => (
            <tr key={index}>
              <td>{list.boardSeq}</td>
              <td>
                <Link to={`/board/BoardDetail/${list.boardSeq}`}>{list.boardTitle}</Link>
              </td>
              <td>{list.admin}</td>
              <td>{list.boardViews}</td>
              <td>{formatDate(list.boardDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonContainer>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>이전</button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => handlePageClick(index)}>
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음</button>
      </ButtonContainer>
      <ButtonContainer>
        <button onClick={handleHome}>돌아가기</button>
      </ButtonContainer>
    </StyledBoardList>
  );
}

export default BoardList;
