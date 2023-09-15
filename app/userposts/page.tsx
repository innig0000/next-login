'use client'
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Top from "@/app/components/Top";
import Link from "next/link";
import {Table} from "react-bootstrap";

function UserPosts() {
    const [data, setData] = useState([]);
    const { data: session } = useSession();

    useEffect(()=>{
        postSubmit();
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
        <div>
            <Top/>
        <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <h1 className='text-4xl font-semibold text-white'>{session.user.name}님이 쓴 글</h1>
            <div>총 글의 개수: {data.length}개</div>
            <Table className="table">
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th>글 제목</th>
                    <th style={{width: "15%"}}>작성자</th>
                    <th style={{width: "15%"}}>작성일자</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className="td-title">
                            <Link href={`/posts/${item.id}`}>{item.title}</Link>
                            </td>
                        <td>{item.author.name}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        </div>
    );
}

export default UserPosts;