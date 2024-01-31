import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../img/Logo_n.png';
const FormContainer = styled.div`
    margin: 50px auto;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align:center;
    td {
        padding: 10px;
        border: 1px solid #ddd;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;
const StyledIdInput = styled.input`
    width: 60%;
    padding: 8px;
    box-sizing: border-box;
`;

const StyledSelect = styled.select`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const StyledButton = styled.input`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
const LogoImage = styled.img`
    width: 150px; /* 적절한 크기로 조절 */
    margin: 0 auto; /* 가운데 정렬을 위한 margin 추가 */
    display: block; /* 가운데 정렬을 위해 block 요소로 설정 */
`;
// 중복확인 버튼
const StyledCheckButton = styled.button`
    margin-left: 15px;
    margin-right: 20px;
    padding: 8px;
    height: 100%;
    background-color: ${props => (props.disabled ? "#888" : "#4caf50")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const StyledResetButton = styled.button`
    padding: 8px;
    height: 100%; 
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const SignUp = () => {
    const navigate = useNavigate();
    
    const [member, setMember] = useState({
        memberName: "",
        username: "",
        password: "",
        email: "",
        domain: "@naver.com",
        phoneNum: "",
        socialNum1:"",
        socialNum2:""
    });

    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    
   
   
    const handleChange = (field, value) => {
        if (field === 'username') {
            const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
            const isInputValid = value.trim() !== '' && usernameRegex.test(value); // 빈 값이 아닌지와 정규식을 통한 유효성 검사
            setIsUsernameValid(isInputValid);
        }
        if (field === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            setIsPasswordValid(passwordRegex.test(value));
        }
        if (field === 'memberName') {
            // 이름은 한글로만 이루어지고, 2~5글자
            const nameRegex = /^[가-힣]{2,5}$/;
            setIsNameValid(nameRegex.test(value));
        }
        

        setMember({ ...member, [field]: value });
    };

    const handleDomainChange = (event) => {
        const selectedDomain = event.target.value;
        setMember({ ...member, domain: selectedDomain });
    };

    const formatPhoneNumber = (phoneNumber) => {
        // 전화번호 형식 변환 (000-0000-0000)
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };
    
    const handlePhoneNumChange = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 11자리까지만 받음
        const truncatedValue = newValue.slice(0, 11);
        // 형식 적용하여 state 업데이트
        setMember({ ...member, phoneNum: formatPhoneNumber(truncatedValue) });
    };
    // 주민번호 유효성검사
    const handleSocialNum1Change = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 6자리까지만 받음
        const truncatedValue = newValue.slice(0, 6);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 6) {
            const year = parseInt(truncatedValue.substring(0, 2), 10);
            const month = parseInt(truncatedValue.substring(2, 4), 10);
            const day = parseInt(truncatedValue.substring(4, 6), 10);
    
            // 연도는 00~99 사이의 값이어야 함
            if (year < 0 || year > 99) {
                alert("올바른 연도 형식이 아닙니다.");
                return;
            }
    
            // 월은 1~12 사이의 값이어야 함
            if (month < 1 || month > 12) {
                alert("올바른 월 형식이 아닙니다.");
                return;
            }
    
            // 일은 1~31 사이의 값이어야 함 (해당 월에 따라 조정 필요)
            if (day < 1 || day > 31) {
                alert("올바른 일 형식이 아닙니다.");
                return;
            }
        }
    
        // 형식 적용하여 state 업데이트
        setMember((prevMember) => ({ ...prevMember, socialNum1: truncatedValue }));
    };
    
    
    const handleSocialNum2Change = (event) => {
        // 입력된 값에서 숫자만 추출
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        // 최대 7자리까지만 받음
        const truncatedValue = newValue.slice(0, 7);
    
        // 형식 및 유효성 검사
        if (truncatedValue.length === 7) {
            const firstDigit = parseInt(truncatedValue.charAt(0), 10);
    
            // 첫 번째 숫자는 1~4 사이의 값이어야 함
            if (firstDigit < 1 || firstDigit > 4) {
                alert("뒷자리 첫 번째 숫자는 1~4까지만 가능합니다.");
                return;
            }
        }
    
        // 형식 적용하여 state 업데이트
        setMember((prevMember) => ({ ...prevMember, socialNum2: truncatedValue }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 이름 유효성 검사
        if (!isNameValid) {
            alert("이름은 한글로 2~5글자 사이여야 합니다.");
            return;
        }
        if (!isCheckButtonDisabled) {
            alert("ID 중복확인 해주세요.");
            return;
        }
        // 비밀번호 일치 여부 확인
        if (member.password !== userPasswordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return; 
        }
        
        if (!isPasswordValid) {
            alert("비밀번호는 최소 8자리, 대문자1, 소문자1, 숫자1로 이루어져야 합니다. (!@#$%^&* 만 가능)");
            return;
        }
        if (!member.memberName || !member.username || !member.password || !member.email || !member.phoneNum) {
            alert("모든 필드를 채워주세요.");
            return;
        }
        
        // 전화번호 유효성 검사
        const phoneRegex = /^(010|011)\d{8}$/;
        if (!phoneRegex.test(member.phoneNum.replace(/-/g, ''))) {
            alert("올바른 전화번호 형식이 아닙니다.");
            return;
        }
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/join", member);
            console.log(response.data);
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data === "ok") {
                console.log(response.data);
                alert(response.data);
                navigate("/");
            } else {
                alert(response.data);
                console.log(response.data);
                
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        }
        console.log("폼 제출됨:", member);
    };

    // 아이디 중복검사
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(false);
    const checkId = async (event) => {
        event.preventDefault();
        // 아이디 유효성 검사
        if (!isUsernameValid) {
            alert("아이디는 영문과 숫자로 이루어진 6~12글자여야 합니다.");
            return;
        }
        try {
            // axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/checkId", member);
            console.log(response.data);
            // 추가적으로 서버로부터의 응답을 처리하거나 상태를 업데이트할 수 있음
            if (response.data === "Exist") {
                console.log(response.data);
                alert("이미 존재하는 아이디입니다.");
            } else if(response.data === "Empty") {
                console.log(response.data);
                alert("아이디를 입력하세요.");
            } else {
                alert(response.data);
                console.log(response.data);
                setIsCheckButtonDisabled(true);
            }
        } catch (error) {
            console.log("Error sending data: ", error);
        } 
    }

    // 다시작성
    const handleReset = () => {
        setMember((prevMember) => ({
            ...prevMember,
            username: "",
        }));
        setUserPasswordCheck("");
        setIsUsernameValid(false);
        setIsCheckButtonDisabled(false); // reset 버튼 클릭 시 CheckId 버튼 활성화
    };
    
    return (
        <FormContainer>
            <LogoImage src={Logo} alt="logo Img" />
            <FormHeader>회원 가입</FormHeader>
            <form onSubmit={handleSubmit}>
                <StyledTable>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("memberName", event.target.value)
                                    }
                                    value={member.memberName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td style={{ display: 'flex', alignItems: 'center' }}> {/* 아이디 입력란과 중복체크 버튼을 가로로 정렬 */}
                                <StyledIdInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("username", event.target.value)
                                    }
                                    value={member.username}
                                    disabled={isCheckButtonDisabled} // 중복 확인 버튼이 활성화되면 ID 입력란 비활성화
                                    style={{
                                        backgroundColor: isCheckButtonDisabled ? "#ddd" : "white",
                                    }} // 중복 확인 버튼이 활성화되면 배경색을 회색으로 변경
                                />
                               <StyledCheckButton
                                    onClick={checkId}
                                    disabled={isCheckButtonDisabled}
                                >
                                    중복확인
                                </StyledCheckButton>
                                <StyledResetButton type="button" onClick={handleReset}>다시작성</StyledResetButton>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <StyledInput
                                    type="password"
                                    onChange={(event) =>
                                        handleChange("password", event.target.value)
                                    }
                                    value={member.password}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td>
                                <StyledInput
                                    type="password"
                                    onChange={(event) => setUserPasswordCheck(event.target.value)}
                                    value={userPasswordCheck}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>주민등록번호</td>
                            <td style={{ display: 'flex' }}>
                                <StyledInput
                                type="text"
                                onChange={handleSocialNum1Change}
                                value={member.socialNum1}
                                style={{ marginRight: '5px' }}
                                />
                                <span style={{fontWeight:"bold"}}>-&nbsp;</span>
                                <StyledInput
                                type="password"
                                onChange={handleSocialNum2Change}
                                value={member.socialNum2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={(event) =>
                                        handleChange("email", event.target.value)
                                    }
                                    value={member.email}
                                />
                                <StyledSelect
                                    name="domain"
                                    onChange={handleDomainChange}
                                    value={member.domain}
                                >
                                    <option value="@naver.com">naver.com</option>
                                    <option value="@google.com">google.com</option>
                                    <option value="@daum.net">daum.net</option>
                                </StyledSelect>
                            </td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td>
                                <StyledInput
                                    type="text"
                                    onChange={handlePhoneNumChange}
                                    value={member.phoneNum}
                                />
                            </td>
                        </tr>
                    </tbody>
                </StyledTable>
                <br />
                <StyledButton type="submit" value="submit" />
            </form>
        </FormContainer>
    );
};

export default SignUp;
