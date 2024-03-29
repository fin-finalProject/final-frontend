import { useEffect, useState } from "react";
import styled from "styled-components";
import PopupDom from './PopupDom';
import DaumPost from './DaumPost';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetTokenToHeader from "../../../token/GetTokenToHeader";

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent; /* 배경색을 투명하게 설정 */
    border: none; /* 테두리를 제거 */
    border-radius:50%;
    color: #333; /* 글자색을 지정 */
    padding: 10px; /* 적절한 패딩값 설정 */
    font-size: 20px; /* 글자 크기 설정 */
    cursor: pointer; /* 커서를 포인터로 변경하여 버튼임을 명시 */
    transition: background-color 0.3s ease; /* 배경색 변화에 애니메이션 효과 추가 */

    &:hover {
        background-color: #f0f0f0; /* 마우스 오버시 살짝 회색으로 배경색 변경 */
    }
`;

const AddAdrButton = styled.button`
    width: 80%;
    height: 30px;
    margin-top: 10px;
    border: 3px solid #FFB6C1;
    border-radius: 5px;
    background-color: white;
    color: orange;
    font-weight: bold;
    cursor: pointer;
`;

const CodeButton = styled.button`
    width: 30%;
    margin-left: 20px;
    border: 3px solid #FFB6C1;
    border-radius: 5px;
    background-color: white;
    color: orange;
    font-weight: bold;
    cursor: pointer;
    height: 82%;
`;

const AdrContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20%;
    left: 33%;
    width: 33%;
    height: 64%;
    border: 1px solid black;
    background-color: white;
    z-index:1;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
`;

const Label = styled.label`
    color: orange;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    height:10px;
    width: 90%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 10px;
    margin-left: 0;
    &:focus {
        outline: none;
    }
`;

const RequiredText = styled.span`
    color: red;
    font-size: 0.9em;
`;

const EditAdr = ({ onClose, onSuccess, address }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addressInfo, setAddressInfo] = useState({
        addrNum: address.addrNum,
        daName: address.daName,
        recipientName: address.recipientName,
        recipientTel: address.recipientTel,
        zipcode: address.zipcode,
        address: address.address,
        addrDetail: address.addrDetail,
        deliveryRequest: address.deliveryRequest,
        isDefault:address.isDefault,
    });
    const openPostCode = () => {
        setIsPopupOpen(true);
    }

    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    const handleAddressSelected = (selectedAddress) => {
        setAddressInfo(prevState => ({
            ...prevState,
            zipcode: selectedAddress.zonecode,
            address: selectedAddress.fullAddress
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    const handlePhoneNumChange = (event) => {
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        const truncatedValue = newValue.slice(0, 11);
        setAddressInfo({ ...addressInfo, recipientTel: formatPhoneNumber(truncatedValue) });
    };
    const handleZipcodeChange = (event) => {
        const newValue = event.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        const truncatedValue = newValue.slice(0, 5); // 최대 5자리까지 자름
        setAddressInfo({ ...addressInfo, zipcode: truncatedValue });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!addressInfo.recipientName || 
            !addressInfo.recipientTel || 
            !addressInfo.zipcode || 
            !addressInfo.address) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }
        try {
            const headers = GetTokenToHeader();
            const response = await axios.post("/addAddress", addressInfo, headers);
            console.log("Address added successfully:", response.data);
            if(response.data.result === "Save"){
                // 주소 추가 성공 후 로직 추가
                onClose();
                onSuccess();
                alert("배송지 수정 성공")
            }
        } catch (error) {
            console.error("Error adding address:", error);
        }
    }
    
    return(
        <AdrContainer>
            <Form onSubmit={handleSubmit}>
                <Label>배송지 이름</Label>
                <Input type="text" name="daName" value={addressInfo.daName || ''} onChange={handleChange} />
                <Label>수령인<RequiredText>(필수)</RequiredText></Label>
                <Input type="text" name="recipientName" value={addressInfo.recipientName || ''} onChange={handleChange} />
                <Label>수령인 연락처<RequiredText>(필수)</RequiredText></Label>
                <Input type="text" name="recipientTel" value={addressInfo.recipientTel || ''} onChange={handlePhoneNumChange} />
                <Label>우편번호<RequiredText>(필수)</RequiredText></Label>
                <div style={{ display: 'flex', width: '100%' }}>
                    <Input type="text" name="zipcode" value={addressInfo.zipcode || ''} onChange={handleZipcodeChange} style={{ width: "50%", marginLeft:"2.4%"}} />
                    <CodeButton type='button' onClick={openPostCode}>우편번호 검색</CodeButton>
                </div>
                <Label>주소<RequiredText>(필수)</RequiredText></Label>
                <Input type="text" name="address" value={addressInfo.address || ''} onChange={handleChange} />
                <Label>상세주소</Label>
                <Input type="text" name="addrDetail" value={addressInfo.addrDetail || ''} onChange={handleChange} />
                <Label>배송시요청사항</Label>
                <Input type="text" name="deliveryRequest" value={addressInfo.deliveryRequest || ''} onChange={handleChange} />
                <AddAdrButton type="submit">수정하기</AddAdrButton>
            </Form>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <DaumPost onClose={closePostCode} onAddressSelected={handleAddressSelected} />
                    </PopupDom>
                )}
            </div>
        <CloseButton type='button' onClick={() => {onClose()}} >X</CloseButton>
        </AdrContainer>
    )

}

export default EditAdr;
