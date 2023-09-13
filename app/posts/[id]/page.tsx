'use client'
import React, {useEffect, useState} from "react";
import Top from "@/app/components/Top";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import Link from "next/link";

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
    const [isModalOpen, setModalOpen] = useState(false);

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
                alert('글이 성공적으로 삭제되었습니다.')
                closeModal();
                router.push("/userposts");
            } else {
                console.error('DELETE request failed');
                alert('글 삭제를 실패하였습니다.')
            }
            } catch (error) {
                console.error('Error:', error);

        }
    }
// 모달 열기
    const openModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    function Modal({ isOpen, onClose, children }) {
        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-content">
                        {children}
                        <button
                            className="px-12 py-4 border rounded-xl bg-yellow-300 mr-4"
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            className="px-12 py-4 border rounded-xl bg-red-300"
                            onClick={deletePost}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        );
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
                            <button
                                className="px-12 py-4 border rounded-xl bg-orange-300 mr-4"
                            >
                                내 글 목록
                            </button>
                        </Link>
                        <Link href="/">
                            <button
                                className="px-12 py-4 border rounded-xl bg-blue-300 mr-4"
                            >
                                전체 목록
                            </button>
                        </Link>
                        </div>
                        :
                        <Link href="/">
                            <button
                                className="px-12 py-4 border rounded-xl bg-blue-300 mr-4"
                            >
                                전체 목록
                            </button>
                        </Link>
                    }
                {session && session.user.name === data.author.name && (
                    <div>
                        <div>
                    <Link href={`/editPost/${id}`}><button
                        className="px-12 py-4 border rounded-xl bg-yellow-300 mr-4"
                    >
                        수정
                    </button></Link>
                    <button
                    className="px-12 py-4 border rounded-xl bg-pink-300"
                    onClick={openModal}
                    >
                    삭제
                    </button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2>해당 글이 삭제됩니다. 정말로 삭제하시겠습니까?</h2>
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