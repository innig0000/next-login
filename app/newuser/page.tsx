'use client'
import React, {useState} from "react";
import Link from "next/link";

function NewUser() {
    const [data, setData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
            } else {
                console.error('POST request failed');
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
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <h1 className='text-4xl font-semibold'>새로운 사용자 계정 생성하기</h1>
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
                type="text"
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
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
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
                type="text"
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
            <Link href="/">
            <div style={{padding: "10px"}}>
                <div className='mt-6'>
                    <button
                        type="home"
                        className='w-full transform rounded-md bg-yellow-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                    >
                        홈 화면으로
                    </button>
                </div>
            </div>
    </Link>
        </form>
        </main>
    );
};

export default NewUser;