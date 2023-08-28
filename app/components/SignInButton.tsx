'use client'
import {signIn, signOut, useSession} from 'next-auth/react'
import React from 'react'
import Link from "next/link";

function SignInButton() {
    const {data: session } = useSession();

    const postSubmit = async () => {
        window.location.href=`api/user/${session.user.id}`;
    }

    if (session && session.user) {
        return (
            <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
                    <button
                        className="px-12 py-4 border rounded-xl bg-purple-300"
                    onClick={postSubmit}>
                        {session.user.name}님이 쓴 글
                    </button>
            <Link href="/userposts">
                        <button className="px-12 py-4 border rounded-xl bg-green-300">
                            UserPosts 페이지
                        </button>
            </Link>
            <button
                className="px-12 py-4 border rounded-xl bg-red-300"
                onClick={() => signOut()}
            >
                {session.user.name}님 Log Out
            </button>
            </div>
        );
    }

    return (
        <div className='space-x-10'>
        <button
            className="px-12 py-4 border rounded-xl bg-yellow-300"
            onClick={() => signIn()}
        >
            LogIn
        </button>

        <Link href="/newuser">
            <button
        className="px-12 py-4 border rounded-xl bg-blue-300"
    >
            Register
       </button>
        </Link>
        </div>
    );
}

export default SignInButton;