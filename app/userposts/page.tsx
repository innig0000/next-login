'use client'
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";

function UserPosts() {
    const [data, setData] = useState([]);
    const { data: session } = useSession();

    useEffect(()=>{
        postSubmit()
        },[])

    const postSubmit = async () => {
        try {
            const response = await fetch(`api/user/${session.user.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': session.user.accessToken
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('GET request successful');
                setData(data);
            } else {
                console.error('GET request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <h1 className='text-4xl font-semibold'>{session.user.name}님이 쓴 글</h1>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th style={{width: "3%"}}>#</th>
                    <th style={{width: "10%"}}>Author</th>
                    <th style={{width: "20%"}}>Title</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.author.name}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>

          <Link href="/">
             <button className="px-12 py-4 border rounded-xl bg-blue-300">
                 홈 화면으로
             </button>
         </Link>
        </div>
    );
}

export default UserPosts;