import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  max-width: 600px;
  width: 100%;
`;

const Admin = styled.p`
  font-weight: bold;
`;

const Title = styled.h2`
  color: #333;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;

  button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const BoardDetail = () => {
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const resp = await axios.get(`/board/BoardDetail/${boardSeq}`);
        setBoard([resp.data]);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    getBoard();
  }, [boardSeq]);

  const handleHome = () => {
    navigate("/board/BoardList");
  };

  const handleEdit = () => {
    alert("수정 페이지로 이동합니다.");
    try {
      navigate(`/board/Edit/${boardSeq}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    alert("삭제하시겠습니까?");
    try {
      await axios.delete(`/board/BoardDelete/${boardSeq}`);
      alert("삭제되었습니다");
      navigate('/board/BoardList');
    } catch (error) {
      console.error('글 삭제 실패', error);
    }
  };

  return (
    <Container>
      {board.map((boardItem, index) => (
        <div key={index}>
          <h1>게시글 상세페이지</h1>
          <Card>
            <Admin>작성자: {boardItem.admin}</Admin>
            <Title>제목: {boardItem.boardTitle}</Title>
            <p>{boardItem.boardContent}</p>
          </Card>
          <ButtonContainer>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={handleHome}>돌아가기</button>
          </ButtonContainer>
        </div>
      ))}
    </Container>
  );
};

export default BoardDetail;