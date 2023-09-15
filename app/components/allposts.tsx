'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const AllPost = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        postSubmit()
    },[])

    const postSubmit = async () => {
        try {
            const response = await fetch(`api/allposts`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
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
            <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
                <h1 className='text-4xl font-semibold text-white'>모든 게시글</h1>
                <div>총 글의 개수: {data.length}개</div>
                <Table className="table table-striped table-bordered text-black-50">
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
                                <Link href={`/posts/${item.id}`}><button className="text-black">{item.title}</button></Link>
                            </td>
                            <td>{item.author.name}</td>
                            <td>{item.createdAt.substring(0, 10)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AllPost;