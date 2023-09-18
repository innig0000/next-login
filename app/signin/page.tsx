'use client'
import React, {useEffect, useRef, useState} from 'react'
import {signIn} from 'next-auth/react'
import Link from "next/link";
import Top from "@/app/components/Top";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from "react-bootstrap";

function Login() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            document.body.classList.add('show-alert');
        } else {
            document.body.classList.remove('show-alert');
        }
    },[showAlert]);

    const showAlertWithText = (text) => {
        setAlertText(text);
        setShowAlert(true);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    const handleSubmit = async () => {
        try {
            const result = await signIn("credentials", {
                username: emailRef.current,
                password: passwordRef.current,
                redirect: false,
            });

            if(result?.error){
                console.log("Authenticationfailed:", result.error);
                showAlertWithText("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
            } else {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("로그인 에러:", error);
            showAlertWithText("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.")
        }
    };

    const handlePasswordKeyPress = (e) => {
       if (e.key === "Enter") {
           handleSubmit();
       }
    }

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Top/>
            {showAlert && (
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
                    <Alert.Heading>알림</Alert.Heading>
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
            <h1 className='text-4xl font-semibold text-black-50'>Login</h1>
            <div>
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm text-gray-800 dark:text-gray-500'
                    >
                        Email
                    </label>

                    <div className='mt-1'>
                        <input
                            ref={emailRef}
                            onChange={(e: any) => {
                                emailRef.current = e.target.value
                            }}
                            id='email'
                            name='email'
                            type='email'
                            required
                            autoFocus={true}
                            className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <label
                        htmlFor='password'
                        className='block text-sm text-gray-800 dark:text-gray-500'
                    >
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            ref={passwordRef}
                            onChange={(e: any) => (passwordRef.current = e.target.value)}
                            onKeyPress={handlePasswordKeyPress}
                            className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-grey-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                        />
                    </div>
                </div>

                <div className='mt-6'>
                    <Button
                        variant="outline-secondary"
                        onClick={handleSubmit}
                        className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    >
                        Log In
                    </Button>
                </div>
                <div className='flex space-x-4 mt-3'>
                <Link href="/find-email">
                        <Button variant="outline-secondary" >
                            이메일 주소 찾기
                        </Button>
                </Link>
                <Link href="/password-reset">
                        <Button variant="outline-secondary">
                            비밀번호 찾기
                        </Button>
                </Link>
                <Link href="/newuser">
                        <Button variant="outline-secondary">
                             회원가입
                        </Button>
                </Link>
                </div>
            </div>
        </main>
    )
}

export default Login