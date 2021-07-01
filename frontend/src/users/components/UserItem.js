import React from 'react';

import './UserItem.css';

const UserItem = (props) => {
    const { id, name, image, placeCount } = props;

    return (
        <li>
            <span>{id}</span>
            <span>{name}</span>
            <img src={image} />
            <span>{placeCount}</span>
        </li>
    );
}

export default UserItem;