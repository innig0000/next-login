'use client'
import React, {useState} from "react";
import Link from "next/link";
import {useSession} from "next-auth/react";
import Top from "@/app/components/Top";

const Posting = () => {
    const [data, setData] = useState({});
    const { data: session } = useSession();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch('/api/posting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': session.user.accessToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('POST request successful');
                alert("내용이 성공적으로 제출되었습니다.")
            } else {
                console.error('POST request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <Top/>
        <h1 className='text-4xl font-semibold'>새로운 글 작성하기</h1>
        <form onSubmit={handleSubmit}>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='title'
                    className='block text-sm text-gray-800 dark:text-gray-200'
                >
                    제목
                </label>
                <div className='mt-1'>
                    <textarea
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={handleInputChange}
                        style={{ width: "800px" }}
                        className='mt-2 block w-full h-[45px] rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
                    />
                </div>
            </div>
            <div style={{padding: "10px"}}>
                <label
                    htmlFor='content'
                    className='block text-sm text-gray-800 dark:text-gray-200'
                >
                    내용
                </label>
                <div className='mt-4'>
                    <textarea
                        type="text"
                        name="content"
                        placeholder="content"
                        onChange={handleInputChange}
                        className='mt-2 block w-full h-[300px] rounded-md border bg-white pl-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
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
        </form>
    </main>
}

export default Posting;