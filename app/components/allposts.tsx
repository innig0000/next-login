'use client'

import Top from "@/app/components/Top";
import React, {useEffect, useState} from "react";

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
                <h1 className='text-4xl font-semibold'>모든 게시글</h1>
                <div>총 글의 개수: {data.length}개</div>
                <table className="table table-dark table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>글 제목</th>
                        <th>내용</th>
                        <th>작성자</th>
                        <th>작성일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.content}</td>
                            <td>{item.author.name}</td>
                            <td>{item.createAt.substring(0, 10)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllPost;