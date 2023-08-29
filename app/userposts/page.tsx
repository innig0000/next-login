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
            <div>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <p>text ID: {item.id}</p>
                            <p>Author: {item.author.name}</p>
                            <p>Title: {item.title}</p>
                            <p>content: {item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
          <Link href="/">
             <button className="px-12 py-4 border rounded-xl bg-blue-300">
                 홈 화면으로
             </button>
         </Link>
        </div>
    );
}

export default UserPosts;