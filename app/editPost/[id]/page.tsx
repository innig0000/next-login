'use client'
import Top from "@/app/components/Top";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Alert, Button, Modal} from "react-bootstrap";
import {useRouter} from "next/navigation";

const EditPost = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id)
    const router = useRouter();
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

    const [show, setShow] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            document.body.classList.add('show-alert');
        } else {
            document.body.classList.remove('show-alert');
        }
    },[showAlert]);

    const showAlertWithText = (text) => {
        setAlertText(text);
        setShowAlert(true);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

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
                setShow(false);
             router.push(`/posts/${id}`)
            } else {
                console.error("Edit failed");
                showAlertWithText("글 수정에 실패했습니다.")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Top/>
            {showAlert && (
                <Alert
                    variant="warning"
                    dismissible
                    className="slide-down-alert"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '200px',
                        zIndex: 9999,
                    }}
                >
                    <Alert.Heading>알림</Alert.Heading>
                    <p>{alertText}</p>
                    <Button
                        variant="outline-warning"
                        className="position-relative start-50 translate-middle-x mb-3"
                        onClick={handleCloseAlert}
                    >
                        닫기
                    </Button>
                </Alert>
            )}
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
                    <label className='block text-sm text-gray-800 dark:text-gray-500'>
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
                    <Button
                        variant="outline-warning"
                        onClick={handleShow}
                    >
                        수정
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>글이 수정됩니다.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>정말로 수정하시겠습니까?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                취소
                            </Button>
                            <Button
                                type="submit"
                                variant="warning"
                                onClick={handleEditSubmit}>
                                수정 완료
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    </div>
            </div>
                </main>
    )
}

export default EditPost;