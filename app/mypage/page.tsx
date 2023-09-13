'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useSession} from "next-auth/react";
import Top from "../components/Top";

const MyPage = () => {
    const [data, setData] = useState({});
    const { data: session } = useSession();
    const id = session.user.id;
    const name = session.user.name;
    const email = session.user.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/newPassword', {
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
                alert("비밀번호가 성공적으로 변경되었습니다.")
            } else {
                console.error('POST request failed');
                alert(JSON.stringify(responseData));
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


                <div class="table-responsive">
                    <table className="table table-centered border mb-0">
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
                                   <button
                                       type="submit"
                                       className='w-full transform rounded-md bg-grey-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
                                   >
                                       Submit
                                   </button>
                               </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

        </div>
    </div>
        </div>
    )
}

export default MyPage;