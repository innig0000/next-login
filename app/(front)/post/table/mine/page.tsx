'use client'
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import Top from "@/app/components/Top";
import Link from "next/link";
import {Spinner, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPagination from "@/app/components/MyPagination";

function UserPosts() {
    const [data, setData] = useState({
        data: [],
        total_items: 0,
        current_page: 1,
        total_pages:0
    });
    const { data: session } = useSession();
    const [storedSession, setStoredSession] = useState({
        user: {
            id: "",
            name: "",
            email: "",
        }
    });
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const storedSessionString = localStorage.getItem('userSession');
        if (storedSessionString) {
            const storedSession = JSON.parse(storedSessionString);
            setStoredSession(storedSession);
        }
    }, []);

    useEffect(() => {
        if (session) {
            localStorage.setItem('userSession', JSON.stringify(session));
            setStoredSession(session);
        }
    }, [session]);

    useEffect(()=>{
        const lastPage = localStorage.getItem('lastPage');
        const page = parseInt(lastPage, 10) || 1;
        setCurrentPage(page);
        postSubmit();
        },[session, storedSession, currentPage])


    const postSubmit = async () => {
        try {
            const response = await fetch(`/api/post/myTable/${storedSession.user.id}?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': session.user.accessToken
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('GET request successful');
                setData(data);
                setIsLoading(false);
            } else {
                console.error('GET request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        localStorage.setItem('lastPage', newPage);
    };

    return (
        <div>
            <Top/>
        <div className='flex min-h-screen flex-col items-center space-y-10 p-24'>
            <h1 className='text-4xl font-semibold '>{storedSession.user.name}님이 쓴 글</h1>
            <div>총 글의 개수: {data.total_items}개</div>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ):(
            <Table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th>글 제목</th>
                    <th style={{width: "15%"}}>작성자</th>
                    <th style={{width: "15%"}}>작성일자</th>
                </tr>
                </thead>
                <tbody>
                {data.data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className="td-title">
                            <Link href={`/post/read/mine/${item.id}`}><button className="text-black">{item.title}</button></Link>
                            </td>
                        <td>{item.author.name}</td>
                        <td>{item.createdAt.substring(0, 10)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
                )}
            <MyPagination
                currentPage={data.current_page}
                totalPages={data.total_pages}
                onPageChange={handlePageChange}
            />
        </div>
        </div>
    );
}

export default UserPosts;