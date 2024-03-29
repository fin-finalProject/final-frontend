import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import GetTokenToHeader from "../../token/GetTokenToHeader";

const isLoginned = !!localStorage.getItem("token");

const PrivateRoute = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const headers = GetTokenToHeader();
        const response = await axios.post("/getMemberInfo", null, headers);
        if (response.data.result === "Success") {
          setRole(response.data.currentMember.role);
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
      }
    };
    fetchMemberInfo();
  }, []);
  if (loading) {
    // 데이터 로딩 중이라면 로딩 스피너 등을 보여줄 수 있습니다.
    return <>로딩중</>;
  }
  if (role === "USER" || role === "ADMIN") {
    return <Outlet />;
  } else if (role === "" || !isLoginned) {
    // role이 ADMIN이 아닌 경우, 로그인 페이지로 리다이렉트합니다.
    return <Navigate to="/login" />;
  } else {
    // role이 초기값인 경우, 데이터를 아직 가져오지 못한 상태이므로 로딩 스피너 등을 보여줄 수 있습니다.
    return <div>Loading...</div>;
  }
};

export default PrivateRoute;
