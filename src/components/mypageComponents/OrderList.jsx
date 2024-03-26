import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const OrderList = ({handleTabClick, setOrderDetailList }) =>{
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchOrders = async (page) => {
        try {
            const headers = GetTokenToHeader();
            const response = await axios.get(`/order/loadMyOrder?page=${page}`, headers);
            console.log(response.data);
            setOrders(response.data.myOrder);
            setTotalPages(response.data.page);
        } catch (error) {
            console.error('주문 목록을 불러오는 중 에러 발생:', error);
        }
    };

    function formatDateTime(dateTimeStr) {
        if(dateTimeStr){
            const [datePart, timePart] = dateTimeStr.split('T');
            const timeOnly = timePart.slice(0, 5);
            return `${datePart}`;
        }
    }

    const goToOrderDetail = (orderDetailList) => {
        console.log('orderDetailList',orderDetailList);
        handleTabClick(4);
        setOrderDetailList(orderDetailList);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    
      const handlePageClick = (page) => {
        setCurrentPage(page);
      };

      useEffect(()=>{
        fetchOrders(currentPage);
      },[currentPage])

    return(
        <Wrapper>
            <Title>주문 내역</Title>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>주문번호</TableHeader>
                        <TableHeader>주문일자</TableHeader>
                        <TableHeader colSpan="2">상세내역</TableHeader>
                        <TableHeader>총 결제 금액</TableHeader>
                        <TableHeader>주문상태</TableHeader>
                    </tr>
                </thead>
                        <React.Fragment>
                            {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{formatDateTime(order.orderDate)}</TableCell>
                                <TableCell style={{width:'55px'}}>
                                    <Img src={order.orderDetailList ? order.orderDetailList[0].thumbnail : 'http://via.placeholder.com/55X80'} alt="" />
                                </TableCell >
                                <TableCell>
                                    <TitleText onClick={() => goToOrderDetail(order.orderDetailList)}>
                                    {order.orderDetailList[0].title}
                                    </TitleText>
                                    <OrderType>등 {order.orderDetailList.length} 종</OrderType>
                                </TableCell>
                                <TableCell>{order.totalPrice + order.deliveryFee} 원</TableCell>
                                <TableCell>{order.approval}</TableCell>
                            </TableRow>
                        ))}
                        
                        </React.Fragment>
            </Table>
            <PaginationContainer>
                <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 0}>이전</PaginationButton>
                {[...Array(totalPages)].map((_, index) => (
                <PaginationButton key={index} onClick={() => handlePageClick(index)}>
                    {index + 1}
                </PaginationButton>
                ))}
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>다음</PaginationButton>
            </PaginationContainer>
        </Wrapper>
        
    );
}

export default OrderList;

const Title = styled.div`
    float: left;
    text-align: left; /* 추가: 텍스트 왼쪽 정렬 */
    font-weight: bold;
    color: #333333;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 30px;
`

const OrderType = styled.div`
    margin-left: 5px;
    font-size: 1rem;
    color: #888;
`;

const Img = styled.img`
    width : 55px;
    height: 80px;
`

const Wrapper = styled.div`
    width: 100%;
    background-color:white;
`;

const Table = styled.table`
    width: 93%;
    margin: 20px auto;
    border-collapse: collapse;
`;
const TableRow = styled.tr`
    border-bottom: 1px solid #DDDDDD;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
`;
const TableHeader = styled.th`
    border-bottom: 3px solid pink;
    border-top: 3px solid pink;
    padding: 8px;
`;

const TableCell = styled.td`
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    
`;

const TitleText = styled.div`

    display: inline-block;
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;

    
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    // background-color: #FFC0CB;
`;

const PaginationButton = styled.button`
    margin: 0 5px; /* 수정된 부분: 좌우 마진 추가 */
    padding: 5px 10px;
    border: 1px solid #ffffff;
    cursor: pointer;
    color: #ffffff;
    background-color: #FFC0CB;

    // &:disabled {
    //     opacity: 0.5;
    //     cursor: not-allowed;
    // }
`;
