'use client'
import React, {useEffect, useRef, useState} from "react";
import Top from "../components/Top";
import {Alert, Button, Table} from "react-bootstrap";

const FindEmail = () => {
    const [data, setData] = useState({
        name: "",
        birthday: "",
    });
    const [emails, setEmails] = useState([]);
    const [click, setClick] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/find-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const Data = await response.json();

            if(response.ok) {
                console.log('POST request successful');
                setEmails(Data);
                setClick(true);
            } else {
                console.error('POST request failed');
                showAlertWithText(JSON.stringify(Data));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    return <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
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
        <h1 className='text-4xl font-semibold text-black-50'>이메일 주소 찾기</h1>
        <form onSubmit={handleSubmit}>
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-black-50 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 white:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                        min="1900-01-01"
                        max={getCurrentDate()}
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <div className='mt-6'>
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                        onClick={handleSubmit}
                    >
                        찾기
                    </Button>
                </div>
            </div>
            <Table className="table mt-10">
                <thead>
                <tr>
                    <th> 찾기 버튼을 누르고 다음 중 본인의 이메일 주소를 찾아보세요.</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {click && (emails.length > 0 ? (
                            emails.map((email, index) => (<p key={index}>{email}</p>))
                        ) : (
                            <p> 해당하는 이메일 주소가 없습니다.</p>
                        ))}
                    </td>
                </tr>
                </tbody>
            </Table>
        </form>
    </main>
}

export default FindEmail;