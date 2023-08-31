'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";

function NewUser() {
    const [data, setData] = useState({});
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (!isEmailTaken && emailChecked && data.name) {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log('POST request successful');
                    alert("계정이 성공적으로 생성되었습니다!")
                }
        } else {
                console.error('POST request failed');
                alert("계정 생성에 실패하였습니다. 모든 필수 항목을 입력하고, 이메일 중복 체크도 확인해 주세요.")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        setIsEmailTaken(false);
        setEmailChecked(false);
    };

    const handleCheckEmail = async () => {

        try {
            const response = await fetch('/api/check-email',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const checkData = await response.json();
            setIsEmailTaken(checkData.isEmailTaken);
            setEmailChecked(true);
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <h1 className='text-4xl font-semibold'>회원 가입</h1>
        <form onSubmit={handleSubmit}>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='name'
                className='block text-sm text-gray-800 dark:text-gray-200'
            >
                Name
            </label>
            <div className='mt-1'>
            <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
                className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='email'
                className='block text-sm text-gray-800 dark:text-gray-200'
            >
                Email
            </label>
            <div className='mt-4'>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className='flex-grow rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
                <button
                    type="button"
                    onClick={handleCheckEmail}
                    className='ml-2 rounded-md bg-grey px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                >
                    중복 체크
                </button>
                {emailChecked && !isEmailTaken && (<p className="text-green-500">사용 가능한 이메일입니다.</p>)}
                {emailChecked && isEmailTaken && (<p className="text-red-500 ml-2">이미 사용 중인 이메일입니다.</p>)}
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <label
                htmlFor='password'
                className='block text-sm text-gray-800 dark:text-gray-200'
            >
                Password
            </label>
            <div className='mt-1'>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
            </div>
            </div>
            <div style={{padding: "10px"}}>
            <div className='mt-6'>
            <button
                type="submit"
                className='w-full transform rounded-md bg-blue-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
            >
                Submit
            </button>
            </div>
            </div>
            <Link href="/signin">
                <div style={{padding: "10px", alignItems: "center", display: "flex", justifyContent: "center"}}>
                    <div className='mt-6'>
                        <button className="w-full px-12 py-4 border rounded-xl bg-blue-300">
                            로그인 페이지로
                        </button>
                    </div>
                </div>
            </Link>
        </form>
        </main>
    );
};

export default NewUser;