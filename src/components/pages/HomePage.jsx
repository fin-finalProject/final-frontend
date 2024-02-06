// import React, { useEffect, useState } from "react";
// import axios from "axios";

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Homepage.scss";
import { Link, useNavigate } from "react-router-dom";

const ConDiv = styled.div`
display: flex;
`;
const GalleryContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 200px;
  width: 200px;
`;

const GalleryItem = styled.div`
  flex: 1;
  border-radius: 1rem;
  background: var(--i) no-repeat center;
  background-size: auto 100%;
  transition: all 0.7s cubic-bezier(0.25, 0.4, 0.45, 1.4);
  width: 100px; /* 이미지 폭 */
  height: 150px; /* 이미지 높이 */

  &:hover {
    flex: 6;
  }
`;

const generateItemStyle = (imgUrl) => ({
  '--i': `url(${imgUrl})`,
});



const HomePage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);
  
  const [newBookList, setNewBookList] = useState([]);
  const [todayBookKyoboList, setTodayBookKyoboList] = useState([]);
  const [nowThisBookKyoboList, setNowThisBookKyoboList] = useState([]);
  const [popularBookKyoboList, setPopularBookKyoboList] = useState([]);
  const navigateToDetail = (isbn) => {
    navigate(`/book-detail/${isbn}`);
  };
  useEffect(() => {
    const testCrawling = async () => {
      try {
        const response = await axios.get("/testCrawling");
        setNewBookList(response.data.newBookList);
        setTodayBookKyoboList(response.data.todayBookKyoboList);
        setNowThisBookKyoboList(response.data.nowThisBookKyoboList);
        setPopularBookKyoboList(response.data.popularBookKyoboList);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };
    testCrawling();
  }, []);
 
  return (
    <div>
      <div className="wrapper">
            <div className="slide_container">
                <ul
                    className="slide_wrapper"
                    onMouseEnter={onStop}
                    onMouseLeave={onRun}
                >
                    <div
                        className={"slide original".concat(
                            animate ? "" : " stop"
                        )}
                    >
                        {newBookList.map((s, i) => (
                            <li
                                key={i}
                                className={"book"}
                            >
                                <Link to={`/book-detail/${s.isbn13}`}>
                                <div className="item">
                                  <img src={s.imgUrl} alt=""  />
                                </div>
                              </Link>
                            </li>
                        ))}
                    </div>
                    <div
                        className={"slide clone".concat(animate ? "" : " stop")}
                    >
                        {newBookList.map((s, i) => (
                            <li
                                key={i}
                                className={"book"}
                            >
                              <Link to={`/book-detail/${s.isbn13}`}>
                                <div className="item">
                                  <img src={s.imgUrl} alt=""  />
                                </div>
                              </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
      {newBookList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {newBookList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
     
      {todayBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <GalleryContainer>
          {todayBookKyoboList.map((d, index) => (
            <GalleryItem 
              style={generateItemStyle(d.imgUrl)} 
              key={index}
              onClick={() => navigateToDetail(d.isbn13)} >
            </GalleryItem>
          ))}
        </GalleryContainer>
      )}
      <br />
      {nowThisBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {nowThisBookKyoboList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
      {popularBookKyoboList.length === 0 ? (
        <h2>로딩중...</h2>
      ) : (
        <ConDiv>
          {popularBookKyoboList.map((d, index) => (
            <div className="box" key={index}>
              <div className="ellipsis">{d.bookName}</div>
              <img src={d.imgUrl} alt="" style={{width:"100px"}} />
            </div>
          ))}
        </ConDiv>
      )}
      <br />
    </div>
  );
};

export default HomePage;
