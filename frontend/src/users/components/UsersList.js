import React from 'react';
import UserItem from './UserItem';

import './UsersList.css';

const UsersList = (props) => {
    return (<ul>
        {props.items.map((user) => {
            const { id, name, image, placeCount } = user;

            return <UserItem
                key={id}
                id={id}
                name={name}
                image={image}
                placeCount={placeCount}
            />
        })}
    </ul>
    );
}

export default UsersList;