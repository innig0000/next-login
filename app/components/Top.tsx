'use client'
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const Top = () => {

    const { data: session } = useSession();


    if (session && session.user) {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                </ul>
            </nav>
            <div className="auth">
                <Link href="/">
                    <button className="menu-button">홈</button>
                </Link>
                <Link href="/posting">
                    <button className="menu-button">새 글 쓰기</button>
                </Link>
                <Link href="/userposts">
                    <button className="menu-button">{session.user.name}님이 쓴 글</button>
                </Link>
                <Link href="/mypage">
                       <button className="menu-button">마이페이지</button>
                </Link>
                <button
                    className="menu-button"
                    onClick={() => signOut()}
                >
                    로그아웃
                </button>
            </div>
        </header>
                );
    } //if...

                return (
                <header className="header">
                    <nav className="nav">
                        <ul className="nav-list">
                        </ul>
                    </nav>
                    <div className="auth">
                        <Link href="/">
                            <button className="menu-button">홈</button>
                        </Link>


                        <Link href="/signin">
                    <button className="menu-button">로그인</button>
                </Link>
                <Link href="/newuser">
                    <button className="menu-button">회원가입</button>
                </Link>
            </div>
        </header>
    );
}

export default Top;