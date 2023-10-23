'use client'
import React, {useEffect, useState} from "react";
import Top from '../components/Top';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button} from "react-bootstrap";
import { useFormik } from 'formik';
import * as yup from 'yup';

function NewUser() {
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [emailTrueChecked, setEmailTrueChecked] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const validationSchema = yup.object({
        name: yup.string().required("사용자 이름을 작성해 주세요."),
        birthday: yup.date().required("생년월일을 입력해주세요"),
        email: yup.string().required("이메일 주소를 입력해 주세요."),
        password: yup.string().min(6, "비밀번호는 6자리 이상 입력해야 합니다.").required("비밀번호를 입력해주세요"),
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            birthday: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

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
            setIsSuccess(true)
        } else {
            setIsSuccess(false);
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    const handleSubmit = async (data) => {
       // e.preventDefault();
        try {
        if (!isEmailTaken && emailChecked) {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log('POST request successful');
                    showAlertWithText("계정이 성공적으로 생성되었습니다!", 'success')
                }
        } else if (isEmailTaken || !emailChecked) {
            console.error('POST request failed');
            showAlertWithText("이메일 중복을 체크해 주세요.", 'fail')
        } else {
            console.error('POST request failed');
            showAlertWithText("계정 생성에 실패했습니다.", 'fail')
        }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckEmail = async (email) => {
        const isMailTrue = yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 주소를 입력하세요");
        isMailTrue.validate(email)
            .then(() => {
                setEmailTrueChecked(true);
            })
            .catch((error) => {
                setEmailTrueChecked(false);
                showAlertWithText(error.message, 'fail');
            })
        try {
            const response = await fetch('/api/check-email',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
            });

            const checkData = await response.json();
            setIsEmailTaken(checkData.isEmailTaken);
            setEmailChecked(true);
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleButtonClick = () => {
       if (formik.errors.name) {
           showAlertWithText(formik.errors.name)
       } else if (formik.errors.birthday) {
           showAlertWithText(formik.errors.birthday)
       } else if (formik.errors.email) {
           showAlertWithText(formik.errors.email)
       } else if (formik.errors.password) {
               showAlertWithText(formik.errors.password)
       }
    }

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
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
            <h1 className='text-4xl font-semibold text-black-50'>회원 가입</h1>
        <form onSubmit={formik.handleSubmit}>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='name'
                className='block text-sm text-gray-800 dark:text-gray-500'
            >
                Name
            </label>
            <div className='mt-2'>
            <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
            </div>
            </div>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='birthday'
                    className='block text-sm text-gray-800 dark:text-gray-500'
                >
                    Birthday
                </label>
                <div className='mt-2'>
                    <input
                        type="date"
                        name="birthday"
                        placeholder="Birthday"
                        onChange={formik.handleChange}
                        value={formik.values.birthday}
                        className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                        min="1900-01-01"
                        max={getCurrentDate()}
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
            <div className='mt-2'>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className='flex-grow rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
                <Button
                    variant="outline-warning"
                    type="button"
                    onClick={() => handleCheckEmail(formik.values.email)}
                    className='ml-2 rounded-md bg-grey px-4 py-2 transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                >
                    중복 체크
                </Button>
                {emailChecked && !isEmailTaken && emailTrueChecked && (<p style={{padding: "0px"}} className="text-success ml-2 mt-1">사용 가능한 이메일 입니다.</p>)}
                {emailChecked && isEmailTaken && (<p style={{padding: "0px"}} className="text-danger ml-2 mt-1">이미 사용 중인 이메일입니다.</p>)}
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='password'
                className='block text-sm text-gray-800 dark:text-gray-500'
            >
                Password
            </label>
            <div>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <div className='mt-6'>
            <Button
                variant="outline-secondary"
                type="submit"
                onClick={() => handleButtonClick()}
                className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
            >
                Submit
            </Button>
            </div>
            </div>
        </form>
        </main>
    );
};

export default NewUser;