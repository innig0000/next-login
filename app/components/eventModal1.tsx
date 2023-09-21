'use client'
import React, {useEffect, useState} from "react";
import {Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const EventModal1 = () => {
    const [show, setShow] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [showSubModal2, setShowSubModal2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openSubModal = () => setShowSubModal(true);
    const closeSubModal = () => setShowSubModal(false);

    const openSubModal2 = () => setShowSubModal2(true);
    const closeSubModal2 = () => setShowSubModal2(false);

    useEffect(() => {
        const hideEventModal = document.cookie.includes("hideEventModal=true");
        const hideEventModal2 = document.cookie.includes("hideEventModal2=true");
        const hideEventModal3 = document.cookie.includes("hideEventModal3=true");
        if(!hideEventModal2) {
            handleShow();
        }
        if(!hideEventModal) {
            openSubModal();
        }
        if(!hideEventModal3) {
            openSubModal2()
        }
    },[])

    const handleHideForToday = () => {
        document.cookie = "hideEventModal=true; expires=24h";
        closeSubModal();
    }

    const handleHideForToday2 = () => {
        document.cookie = "hideEventModal2=true; expires=24h";
        handleClose();
    }

    const handleHideForToday3 = () => {
        document.cookie = "hideEventModal3=true; expires=24h";
        closeSubModal2();
    }

    return <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>환영합니다.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    src="/flower.jpeg"
                    alt="welcome"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <p> 아름다운 글들을 한 아름 모아보세요. </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-info" onClick={handleHideForToday2}>
                    오늘 하루 그만 보기
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>

        {showSubModal && (
            <Modal
                show={showSubModal}
                onHide={closeSubModal}
                style={{
                    position: "fixed",
                    top: "50px",
                    left: "50px"
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>회원가입 이벤트</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p> 새로 가입한 회원에게 상품권을 드립니다. </p>
                    <p> 이벤트 기간: 2023년 9월 1일 ~ 2023년 10월 31일 </p>
                    <p> 많은 관심 부탁드립니다.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={handleHideForToday}>
                        오늘 하루 그만 보기
                    </Button>
                    <Button variant="outline-secondary" onClick={closeSubModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        )}

        {showSubModal2 && (
            <Modal
                show={showSubModal2}
                onHide={closeSubModal2}
                style={{
                    position: "fixed",
                    top: "100px",
                    left: "100px"
            }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>모달 테스트</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    삼중 모달 테스트
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={handleHideForToday3}>
                        오늘 하루 그만 보기
                    </Button>
                    <Button variant="outline-secondary" onClick={closeSubModal2}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        )}

    </div>
}

export default EventModal1;