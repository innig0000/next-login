import {verifyJwt} from "@/app/lib/jwt";
import prisma from '@/app/lib/prisma';

const handler = async (req, {params}) => {
    const method = req.method;
    const param1 = params.params[0];
    const param2 = params.params[1];
    const accessToken = req.headers.get('authorization')

    switch (method) {

        case 'POST':
            //새 글 쓰기
            if (param1 === 'write') {
                const body = await req.json();
                if (!accessToken || !verifyJwt(accessToken)) {
                    return new Response(JSON.stringify({error: 'No Authorization'}), {status: 401,})
                } else {
                    const token = verifyJwt(accessToken);
                    const id = Number(token.id);
                    const newPost = await prisma.post.create({
                        data: {
                            title: body.title,
                            content: body.content,
                            author: {
                                connect: {
                                    id: id
                                }
                            }
                        },
                    })
                    console.debug(newPost);
                    return new Response(newPost.id)
                }
            } else {
                return new Response(JSON.stringify({message: "잘못된 param 입니다."}))
            }
            break;

        case 'GET':
            if (param1 === 'read') {
                //글 읽어오기
                const id = Number(param2);
                const Posts = await prisma.post.findFirst({
                    where: {
                        id: id,
                    },
                    include: {
                        author: {
                            select: {
                                email: true,
                                name: true,
                            },
                        },

                    },
                })
                return new Response(JSON.stringify(Posts))
            } else if (param1 === 'allTable') {
                //모든 글 테이블
                const page = req.url.split('?')[1].split('page=')[1] || 1;
                const pageSize = 10;
                const offset = (page - 1) * pageSize;
                const totalItems = await prisma.post.count();
                const totalPages = Math.ceil(totalItems / pageSize)

                const allPosts = await prisma.post.findMany({
                    orderBy: {
                        id: 'desc'
                    },
                    include: {
                        author: {
                            select: {
                                email: true,
                                name: true,
                            }
                        }
                    },
                    take: parseInt(pageSize),
                    skip: parseInt(offset),

                });

                return new Response(JSON.stringify({
                    data: allPosts,
                    total_items: totalItems,
                    current_page: page,
                    total_pages: totalPages,
                    page_size: pageSize,
                }));
            } else if (param1 === 'myTable') {
                //내 글 테이블
                if (!accessToken || !verifyJwt(accessToken)) {
                    return new Response(JSON.stringify({error: 'No Authorization'}), {status: 401,})
                } else {
                    const id = Number(param2)
                    const page = req.url.split('?')[1].split('page=')[1] || 1;
                    const pageSize = 10;
                    const offset = (page - 1) * pageSize;
                    const totalItems = await prisma.post.count({
                        where: {
                            authorId: id,
                        },
                    });
                    const totalPages = Math.ceil(totalItems / pageSize)

                    const userPosts = await prisma.post.findMany({
                        orderBy: {
                            id: 'desc'
                        },
                        where: {
                            authorId: id,
                        },
                        include: {
                            author: {
                                select: {
                                    email: true,
                                    name: true,
                                },
                            },
                        },
                        take : parseInt(pageSize),
                        skip : parseInt(offset),
                    })

                    return new Response(JSON.stringify({
                        data: userPosts,
                        total_items: totalItems,
                        current_page: page,
                        total_pages: totalPages,
                        page_size: pageSize,
                    }))
                }
            } else {
                return new Response(JSON.stringify({message: "잘못된 param 입니다."}))
            }
            break;

        case 'PUT':
            //글 수정하기
            if (param1 === 'edit'){
                const body = await req.json();
                const updatedPostData = {
                    title: body.title,
                    content: body.content,
                }
                if (!accessToken || !verifyJwt(accessToken)) {
                    return new Response(JSON.stringify({error: 'No Authorization'}), {status: 401,})
                } else {
                    const id = Number(param2)
                    console.debug(id);
                    const updatedPost = await prisma.post.update({
                        where: {
                            id: id,
                        },
                        data: updatedPostData,
                    });
                    console.debug("포스트 수정 성공:", updatedPost);
                    return new Response(JSON.stringify(updatedPost))
                }
            } else {
                return new Response(JSON.stringify({message: "잘못된 param 입니다."}))
            }
            break;

        case 'DELETE':
            //글 삭제하기
            if (param1 === 'delete') {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return new Response(JSON.stringify({error: 'No Authorization'}), {status: 401,})
                } else {
                    const id = Number(param2)
                    console.debug(id);
                    const deletedPost = await prisma.post.delete({
                        where: {
                            id: id,
                        },
                    });
                    console.debug(deletedPost);

                    return new Response(JSON.stringify(deletedPost))
                }
            } else {
                return new Response(JSON.stringify({message: "잘못된 param 입니다."}))
            }
            break;

        default:
            return new Response(JSON.stringify({error: "잘못된 param 입니다"}), {status: 400});
            break;
    }
};

export {handler as GET, handler as POST, handler as PUT, handler as DELETE}