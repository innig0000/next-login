'use client'
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from "@/app/components/Top";
import Link from "next/link";
import {Button} from "react-bootstrap";

const TotalPosts = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState({
        author: {name: ""},
        createdAt: "",
        title: "",
        content: "",
    })

    const id = Number(params.id)

    useEffect(() =>{
        detailPage();
    },[]);

    const detailPage = async () => {
        try {
            const response = await fetch(`/api/post/read/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log('POST request successful');
                setData(data);
            } else {
                console.error('POST request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Top/>
            <div className="post-detail-container">
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-500'>
                        작성자
                    </label>
                    <div className="post-content">{data.author.name}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-500'>
                        작성일
                    </label>
                    <div className="post-content">{data.createdAt.substring(0, 10)}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-500'>
                        제목
                    </label>
                    <div className="post-content">{data.title}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-500'>
                        내용
                    </label>
                    <div className="post-content h-[300px]">{data.content}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "center"}}>
                    <div>
                        <Link href="/post/table/total">
                            <Button variant="outline-secondary" className="mx-2">
                                전체 목록
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default TotalPosts;