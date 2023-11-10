'use client'
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const SentenceSnow = () => {

    const [position, setPosition] = useState(0);

    const onScroll = () => {
        setPosition(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <main className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <Container>
                <Row>
                    <Col>
            <Card.Img src="/firewall.jpeg" style={{ opacity: `${1-position/500}`}}/>
                    </Col>
                   <Col>
            <Card body style={{ border: 'none'}}>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            <p body style={{fontSize: '30px', transform: `translateY(${position * -0.01}px)`, opacity: `${1-position/500}`}}>
                환영합니다.
            </p>
                <p></p>
                <p></p>
            <p style={{fontSize: '30px', transform: `translateY(${position * -0.05}px)`, opacity: `${1-position/500}`}}>
                <Link href="/post/table/total">
                    <Button variant="outline-secondary">
                        모든 글
                    </Button>
                </Link>
                을 클릭하여 여러분이 작성한 글들을 읽어보세요.
            </p>
                <p></p>
                <p></p>
            <p body style={{fontSize: '30px', transform: `translateY(${position * -0.09}px)`, opacity: `${1-position/500}`}}>
                <Link href="/user/new">
                    <Button variant="outline-secondary">
                        회원 가입
                    </Button>
                </Link>
                &
                <Link href="/user/login">
                    <Button variant="outline-secondary">
                        로그인
                    </Button>
                </Link>
                을 하면 글을 쓸 수 있어요.
            </p>
            </Card>
                   </Col>
                   </Row>
                <Row>
                <Col md={{ span: 1, offset: 6}}>
                <Card.Img src="/downArrow.png" style={{width: "50px", height: "auto", opacity: `${1-position/100}`}}/>
            </Col>
        </Row>
               <Row>
                   <Col>
                <Card body style={{ border: 'none'}}>
            <p style={{fontSize: '30px', opacity: `${(position-300)/300}`, transform: `translateY(${(500-position) * -0.01}px)`}}>"좋은 글은 독자의 생각을 바꾸고,</p>
            <p style={{fontSize: '30px', opacity: `${(position-300)/300}`, transform: `translateY(${(500-position) * -0.03}px)`}}>마음을 움직이며,</p>
            <p style={{fontSize: '30px', opacity: `${(position-300)/300}`, transform: `translateY(${(500-position) * -0.05}px)`}}>세상을 보는 시선을 바꿔준다."</p>
            <p style={{fontSize: '30px', opacity: `${(position-300)/300}`, transform: `translateY(${(500-position) * -0.07}px)`}}>- George Orwell</p>
                </Card>
                   </Col>
                   <Col>
                <Card.Img src="/reading.jpeg" alt="reading" style={{width: "570px", height: "auto", opacity: `${(position-400)/500}`, transform: `translateY(${position / -3}px)`}}/>
                   </Col>
            </Row>
                <Row>
                    <Col md={1}>
                        <Card.Text style={{ transform: 'rotate(270deg)'}}>
                            Copyright 2023. SlowCatBibi All rights reserved.
                        </Card.Text>
                    </Col>
                    <Col md={{ span: 6, offset: 1}}>
                        <Card.Img src="writing.jpeg" alt="writing" style={{transform: `translateX(${position / 10}px)`}}/>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default SentenceSnow;