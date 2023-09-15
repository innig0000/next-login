'use client'
import React, {useEffect, useState} from "react";
import Top from "@/app/components/Top";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState({
        author: {name: ""},
        createdAt: "",
        title: "",
        content: "",
    })

    const id = Number(params.id)
    const router = useRouter();
    const { data: session } = useSession();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const deletePost = async () => {
        try {
            const Response = await fetch(`/api/deletePost/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': session.user.accessToken,
                },
            });

            if (Response.ok) {
                console.log('DELETE request successful');
                router.push("/userposts");
            } else {
                console.error('DELETE request failed');
                alert('글 삭제를 실패하였습니다.')
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
                    <div className="post-content">{data.title}</div>
                </div>
                <div  style={{padding: "10px"}}>
                    <label className='block text-sm text-gray-800 dark:text-gray-200'>
                        내용
                    </label>
                    <div className="post-content h-[300px]">{data.content}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "center"}}>
                    {session ?
                        <div>
                        <Link href="/userposts">
                            <Button variant="outline-secondary" className="mx-2">
                                내 글 목록
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline-secondary" className="mx-2">
                                전체 목록
                            </Button>
                        </Link>
                        </div>
                        :
                        <Link href="/">
                            <Button variant="outline-secondary" className="mx-2">
                                전체 목록
                            </Button>
                        </Link>
                    }
                {session && session.user.name === data.author.name && (
                    <div>
                        <div>
                    <Link href={`/editPost/${id}`}>
                        <Button variant="outline-warning" className="mx-2">
                        수정
                    </Button>
                    </Link>
                    <Button variant="outline-danger" className="mx-2" onClick={handleShow}>
                    삭제
                    </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>글이 삭제됩니다.</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        취소
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="danger"
                                        onClick={deletePost}>
                                        삭제
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            </div>
                    </div>
                )}
                </div>
            </div>
        </main>
)
}

export default Posts;