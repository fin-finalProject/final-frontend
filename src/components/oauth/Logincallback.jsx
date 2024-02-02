import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () =>{
    const navigate = useNavigate();
    const token = new URL(window.location.href).searchParams.get("accessToken")
    const refreshToken = new URL(window.location.href).searchParams.get("refreshToken")
    useEffect(() => {
        if(token){
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            alert("소셜 로그인 성공!");
            navigate("/");
            console.log("왜안가냐?")
        }else{
            alert("소셜 로그인 실패...");
        }
    }, [token, refreshToken, navigate]);
    return null;
}

export default LoginCallback;