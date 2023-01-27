import React from 'react';
import './style.css'

type Props = {
    item: string;
    quantity: number;
    price: string;
}

export const ListItem = ({ item, quantity, price }: Props) => {
    return (
        <div className='ListContainer'>
            <p>{item}</p>
            <p>{quantity}</p>
            <p>${price}</p>
        </div>
    )
}

export default ListItem;