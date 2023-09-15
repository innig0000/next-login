'use client'
import React, {useRef, useState} from "react";
import Top from "../components/Top";
import {Button, Table} from "react-bootstrap";

const FindEmail = () => {
    const nameRef = useRef(null);
    const [emails, setEmails] = useState([]);
    const [click, setClick] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch('api/find-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"name": nameRef.current}),
            });
            const data = await response.json();
            if(response.ok) {
                console.log('POST request successful');
                setEmails(data);
                setClick(true);
            } else {
                console.error('POST request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNameKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <Top/>
        <h1 className='text-4xl font-semibold text-white'>이메일 주소 찾기</h1>
        <div>
            <div className='mt-4'>
                <label
                    htmlFor='name'
                    className='block text-sm text-gray-800 dark:text-gray-200'
                >
                    사용자 이름을 입력하세요.
                </label>
                <div className='mt-1'>
                    <input
                        type='name'
                        id='name'
                        name='name'
                        placeholder='이름'
                        ref={nameRef}
                        onChange={(e: any) => (nameRef.current = e.target.value)}
                        onKeyPress={handleNameKeyPress}
                        className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div className='mt-6'>
                <Button
                    variant="outline-secondary"
                    onClick={handleSubmit}
                    className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                >
                    찾기
                </Button>
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
        </div>
    </main>
}

export default FindEmail;