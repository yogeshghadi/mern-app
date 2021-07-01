import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [{
        id: "u1",
        name: "Yogesh",
        image: "",
        placeCount: 2,
    },
    {
        id: "u2",
        name: "Aaroh",
        image: "",
        placeCount: 4,
    }
    ];

    return <UsersList items={USERS} />
}

export default Users;