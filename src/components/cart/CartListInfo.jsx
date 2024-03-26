import styled from "styled-components";
import XButton from "./XButton";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";


const CartListInfo = ({cartInfoList, bookCount,setBookCount, bookPrice,setBookPrice, checkItems, setCheckItems,removeFromCart }) => {

  useEffect(()=>{

  },[cartInfoList]); 


  const decrease = async (index, isbn, price) =>{
    if(bookCount[index] > 1){
      const updateCount = [...bookCount];
      updateCount[index] -= 1;
      setBookCount(updateCount);

      const updatedPrice = updateCount[index] * price;
      setBookPrice({...bookPrice, [isbn]:updatedPrice});
    }
  }

  const increase = async (index, isbn, price) =>{
    const updateCount = [...bookCount];
    updateCount[index] += 1;
    console.log('increase', updateCount);
    setBookCount(updateCount);

    const updatedPrice = updateCount[index] * price;
    setBookPrice({...bookPrice, [isbn]: updatedPrice});
};

  const handleSingleCheck = (book, totalPrice, checked) =>{
    if(checked){
      setCheckItems((prev) => [...prev, book]);
      setBookPrice({...bookPrice, [book.isbn]:totalPrice});
    }else{
      setCheckItems(checkItems.filter((el) => el.isbn !== book.isbn));
      setBookPrice({...bookPrice, [book.isbn]: 0});
    }
  }

  const isChecked = (book) =>{
    return checkItems.some((item) => item.isbn === book.isbn);
  }


    return (
      <CartWrapper>
        {cartInfoList.length === 0 ? (
      <div>장바구니에 담긴 상품이 없습니다.</div>
    ) : (cartInfoList.map((book, index) => {
          const totalPrice = bookCount[index] * book.salePrice;
          
          return (
            <CartContainer key={index}>
              <CheckBox
                type="checkbox"
                name={`select-${book.isbn}`}
                onChange={(e) => handleSingleCheck(book, totalPrice, e.target.checked)}
                checked={isChecked(book) ? true : false}
              />
              <Img>
                <img src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/120X150'} alt="" />
              </Img>
              <BookInfo>
                <li>{book.title}</li>
                <li>판매가 {book.salePrice} 원</li>
              </BookInfo>
              <BookTotalPrice>
                <li>{totalPrice} 원</li>
                <li>
                  <button onClick={() => decrease(index, book.isbn, book.salePrice)}>-</button> {bookCount[index]}{" "}
                  <button onClick={() => increase(index, book.isbn, book.salePrice)}>+</button>
                </li>
              </BookTotalPrice>
              <ul>
                <li><XButton isbn={book.isbn} onRemove={removeFromCart} /></li>
              </ul>
            </CartContainer>
          );
        }))}
      </CartWrapper>
    );
  }

const CartContainer = styled.div`
  display: flex;
  margin: 10px;
  width: 80%;
  font-size: 14px;
  font-weight: 500;
`

const CheckBox = styled.input`
  margin: 5px 20px 0 5px;
  vartical-align: text-top;
`

const Img = styled.div`
  width : 120px;
  height : 160px;
  img{
    width : 120px;
    height: 160px;
  }
`

const BookInfo = styled.ul`
  margin: 10px 30px;
  width: 100%;

  li:last-child{
    margin: 10px 0 0 0;
  }
`

const BookTotalPrice = styled.ul`
  margin: 10px 0 0 50px;
  width: 150px;

  button{
    font-weight: bold;
    margin: 10px 5px;
    width: 15px;
    height: 20px;
    background-color: #FFEDED;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`
const CartWrapper = styled.div`
  width: 60%;
`

  
export default CartListInfo;