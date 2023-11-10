'use client'
import Top from "@/app/components/Top";
import React, {useEffect, useState} from "react";
import {Alert, Button} from "react-bootstrap";

const PassWordReset = () => {
    const [data, setData] = useState({
        name: "",
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

    const showAlertWithText = (text, type) => {
        setAlertText(text);
        setShowAlert(true);
        if (type === 'success') {
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/signin/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const Data = await response.json();
            if(response.ok && data.name === Data) {
                console.log('POST request successful');
                showAlertWithText("이메일로 임시 비밀번호를 전송하였습니다.", 'success')
            } else if (Data === null || !Data.name) {
                console.error('POST request failed');
                showAlertWithText("정확인 이름과 이메일을 입력하세요.", 'fail')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return  <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <Top/>
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
                <Alert.Heading>실패 알림</Alert.Heading>
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
        <h1 className='text-4xl font-semibold text-black-50'>비밀번호 찾기</h1>
        <div>사용자 이름과 이메일 주소를 입력해주세요. </div>
        <form onSubmit={handleSubmit}>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='name'
                    className='block text-sm text-gray-800 dark:text-gray-500'
                >
                    Name
                </label>
                <div className='mt-1'>
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='email'
                    className='block text-sm text-gray-800 dark:text-gray-500'
                >
                    Email
                </label>
                <div className='mt-4'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        className='flex-grow rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <div className='mt-6'>
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    >
                        계속하기
                    </Button>
                </div>
            </div>
        </form>
    </main>
}

export default PassWordReset;