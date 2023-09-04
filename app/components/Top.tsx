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
                    <button className="login-button">홈</button>
                </Link>
                    <button
                        className="logout-button"
                    onClick={() => signOut()}
                    >
                        로그아웃
                    </button>
                    <Link href="/mypage">
                       <button className="mypage-button">마이페이지</button>
                    </Link>
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
                            <button className="login-button">홈</button>
                        </Link>


                        <Link href="/signin">
                    <button className="login-button">로그인</button>
                </Link>
                <Link href="/newuser">
                    <button className="signup-button">회원가입</button>
                </Link>
            </div>
        </header>
    );
}

export default Top;