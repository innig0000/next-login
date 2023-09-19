import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";

const MyPagination = ({currentPage, totalPages, onPageChange}) => {

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={()=>onPageChange(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
                <Pagination>{items}</Pagination>
        </div>
    );
};

export default MyPagination;