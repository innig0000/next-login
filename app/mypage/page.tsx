'use client'
import React, {useEffect} from "react";
import Link from "next/link";
import {useSession} from "next-auth/react";
import Top from "../components/Top";

const MyPage = () => {
    const { data: session } = useSession();
    const id = session.user.id;
    const name = session.user.name;
    const email = session.user.email;


    return (
        <div>
        <Top/>
    <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
        <div class="col-lg-4">


                <div class="table-responsive">
                    <table className="table table-centered border mb-0">
                        <thead class="bg-light">
                        <tr>
                            <th colSpan="2">내 정보 확인하기</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">회원 번호:</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th scope="row">회원 이름:</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th scope="row">이메일 주소:</th>
                            <td>{email}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

        </div>
    </div>
        </div>
    )
}

export default MyPage;