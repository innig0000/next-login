'use client'
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Top from "../../../components/Top";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table, Alert} from "react-bootstrap";

const MyPage = () => {
    const [data, setData] = useState({});
    const { data: session } = useSession();
    const [storedSession, setStoredSession] = useState({
        user: {
            id: "",
            name: "",
            email: "",
            bday: "",
        }
    });
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (showAlert) {
            document.body.classList.add('show-alert');
        } else {
            document.body.classList.remove('show-alert');
        }
    },[showAlert]);

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        const storedSessionString = localStorage.getItem('userSession');
        if (storedSessionString) {
            const storedSession = JSON.parse(storedSessionString);
            setStoredSession(storedSession);
        }
    }, []);

    useEffect(() => {
        if (session) {
            localStorage.setItem('userSession', JSON.stringify(session));
            setStoredSession(session);
        }
    }, [session]);

    const id = storedSession.user.id;
    const name = storedSession.user.name;
    const email = storedSession.user.email;
    const bday = storedSession.user.bday;

    const showAlertWithText = (text, type) => {
        setAlertText(text);
        setShowAlert(true);
        if (type === 'success') {
            setIsSuccess(true)
        } else {
            setIsSuccess(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/signin/newPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': session.user.accessToken,
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json()
            if (response.ok) {
                console.log('POST request successful');
                showAlertWithText("비밀번호가 성공적으로 변경되었습니다.", 'success')
            } else {
                console.error('POST request failed');
                showAlertWithText(JSON.stringify(responseData), 'fail');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };


    return (
        <div>
        <Top/>
    <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <div class="col-lg-4">
            {showAlert && isSuccess && (
                <Alert
                    variant="success"
                    dismissible
                    className="slide-down-alert"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '200px',
                        zIndex: 9999,
                    }}
                >
                    <Alert.Heading>성공 알림</Alert.Heading>
                    <p>{alertText}</p>
                    <Button
                        variant="outline-success"
                        className="position-relative start-50 translate-middle-x mb-3"
                        onClick={handleCloseAlert}
                    >
                        닫기
                    </Button>
                </Alert>
            )}
            {showAlert && !isSuccess && (
                <Alert
                    variant="warning"
                    dismissible
                    className="slide-down-alert"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '200px',
                        zIndex: 9999,
                    }}
                >
                    <Alert.Heading> 실패 알림</Alert.Heading>
                    <p>{alertText}</p>
                        <Button
                        variant="outline-warning"
                        className="position-relative start-50 translate-middle-x mb-3"
                        onClick={handleCloseAlert}
                    >
                        닫기
                    </Button>
                </Alert>
            )}

                <div class="table-responsive">
                    <Table className="table table-centered border mb-0">
                        <thead class="bg-light">
                        <tr>
                            <th colSpan="2">내 정보 확인하기</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">회원 번호:</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th scope="row">회원 이름:</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th scope="row">이메일 주소:</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th scope="row">생년월일:</th>
                            <td>{bday}</td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 변경하기:</th>
                            <td>
                               <form onSubmit={handleSubmit}>
                                   <div style={{padding: "10px"}}>
                                   <label>
                                       기존 비밀번호 입력하기
                                   </label>
                                   <div className='mt-1'>
                                       <input
                                           type="password"
                                           name="password"
                                           onChange={handleInputChange}
                                           className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                                       />
                                   </div>
                                   </div>
                                   <div style={{padding: "10px"}}>
                                       <label>
                                           새로운 비밀번호 입력하기
                                       </label>
                                       <div className='mt-1'>
                                           <input
                                               type="password"
                                               name="newPassword"
                                               onChange={handleInputChange}
                                               className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                                           />
                                       </div>
                                   </div>
                                   <div style={{padding: "10px"}}>
                                       <label>
                                           새로운 비밀번호 확인하기
                                       </label>
                                       <div className='mt-1'>
                                           <input
                                               type="password"
                                               name="checkPassword"
                                               onChange={handleInputChange}
                                               className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                                           />
                                       </div>
                                   </div>
                                   <Button
                                       variant="outline-info"
                                       type="submit"
                                   >
                                       Submit
                                   </Button>
                               </form>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
        </div>
    </div>
        </div>
    )
}

export default MyPage;