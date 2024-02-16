import {Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Mypage from './components/pages/Mypage';
import Cart from './components/pages/Cart';
import CustomerService from './components/pages/CustomerService';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail';
import BoardCreate from './components/board/BoardCreate';
import Edit from './components/board/Edit';
import SearchBook from './components/pages/SearchBook';
import BookDetail from './components/pages/BookDetail';
import LoginCallback from './components/oauth/Logincallback';
import Order from './components/order/order';
import OrderSuccess from './components/order/OrderSuccess';
import InquiryArea from './components/board/InquiryArea';
import InquiryList from './components/board/InquiryList';
import InquiryDetail from './components/board/InquiryDetail';
import FindIdOrPwd from './components/pages/FindIdOrPwd';
import NotFound from './components/pages/NotFound';
import PrivateRoute from './components/roleRoutes/PrivateRoute';
import AdminRoute from './components/roleRoutes/AdminRoute';
import AdminPage from './components/pages/AdminPage';
import AdminOrderDetail from './components/adminComponents/AdminOrderDetail';
import Inquiry from './components/board/Inquiry';
import OkInquiryList from './components/board/OkInquiryList';
import UnInquiryList from './components/board/UnInquiryList';
import InquiryAllList from './components/board/InquiryAllList';
import AdminBoardDetail from './components/board/AdminBoardDetail';
import AdminBoardList from './components/board/AdminBoardList';
function App() {
  return (
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route element={<Layout />} >
          <Route index element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/login/callback' element={<LoginCallback />}/>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/order/success' element={<OrderSuccess/>}/>
          <Route path='/customer-service' element={<CustomerService/>}/>
          {/* 책 검색 */}
          <Route path='/book-search/:keyword' element={<SearchBook />}/>   
          <Route path='/book-detail/:isbn' element={<BookDetail/>}/>   
          {/* 게시판 */}
          <Route path='/board/BoardList' element={<BoardList/>}/>   
          <Route path='/board/AdminBoardList' element={<AdminBoardList/>}/>   
          <Route path='/board/AdminBoardDetail/:boardSeq' element={<AdminBoardDetail/>}/> 
          <Route path='/board/BoardDetail/:boardSeq' element={<BoardDetail/>}/> 
          <Route path='/board/BoardCreate' element={<BoardCreate/>}/> 
          <Route path='/board/Edit/:boardSeq' element={<Edit/>}/>
          {/* 아이디/비밀번호 찾기 */}
          <Route path='/find' element={<FindIdOrPwd />}/>
          {/* 로그인 해야만 들어갈 수 있는 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path='/mypage' element={<Mypage />}/>
            {/* 1대1문의 */}
            <Route path='/board/InquiryArea' element={<InquiryArea/>}/> 
            <Route path='/board/InquiryList' element={<InquiryList/>}/> 
            <Route path='/board/InquiryDetail/:inquiryId' element={<InquiryDetail/>}/> 
            <Route path='/board/Inquiry' element={<Inquiry />}/> 
            <Route path='/board/UnInquiryList' element={<UnInquiryList/>}/> 
            <Route path='/board/OkInquiryList' element={<OkInquiryList/>}/> 
            {/* <Route path='/board/InquiryAllList' element={<InquiryAllList/>}/>  */}
          </Route>
          {/* admin */}
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminPage />}/> 
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
