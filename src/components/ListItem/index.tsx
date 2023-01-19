import React from 'react';
import './style.css'

type Props = {
    item: string;
    quantity: number;
    icon: string;
}

export const ListItem = ({ item, quantity, icon }: Props) => {
    return (
        <div className='ListContainer'>
            <p>Item: {item}</p>
            <p>Quantity: {quantity}</p>
            <img src="" alt={icon} />
        </div>
    )
}

export default ListItem;