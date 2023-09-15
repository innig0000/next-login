'use client'
import Top from "@/app/components/Top";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {Button} from "react-bootstrap";

const EditPost = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id)
    const { data: session } = useSession();
    const [data, setData] = useState({
        author: {name: ""},
        createdAt: "",
        title: "",
        content: "",
    })

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    useEffect(() =>{
        detailPage();
    },[]);

    const detailPage = async () => {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const postData = await response.json();

            if (response.ok) {
                console.log('POST request successful');
                setData(postData);
                setFormData({
                    title: postData.title,
                    content: postData.content,
                });
            } else {
                console.error('POST request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async () => {
        const confirmation = window.confirm('정말로 수정하시겠습니까?');

        if (confirmation){
        try {
            const response = await fetch(`/api/editPost/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": session.user.accessToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Edit successful");
                alert("글 수정을 성공했습니다.")
                setFormData({
                    title: "",
                    content: "",
                });

                detailPage();
            } else {
                console.error("Edit failed");
                alert("글 수정에 실패했습니다.")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.log("수정이 취소되었습니다.")
            alert("수정이 취소되었습니다.")
        }
    }

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Top/>
            <div className="post-detail-container">
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-200'>
                        작성자
                    </label>
                    <div className="post-content">{data.author.name}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-200'>
                        작성일
                    </label>
                    <div className="post-content">{data.createdAt.substring(0, 10)}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-200'>
                        제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="post-content w-full"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-200'>
                        내용
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="post-content h-[300px] w-full"
                        value={formData.content}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <Link href={`/posts/${id}`}>
                    <Button
                        variant="outline-warning"
                        onClick={handleEditSubmit}
                    >
                        수정
                    </Button>
                    </Link>
                    </div>
            </div>
                </main>
    )
}

export default EditPost;