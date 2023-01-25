import React, { useEffect, useState } from 'react'
import './styles.css'
import ListItem from '../ListItem'

type Props = {
    orderId: string;
}

export const OrderInfoContainer = ({ orderId }: Props) => {

    // State Variables
    // const [itemsList, setItemsList] = useState<null[]>({})

    const items = [
        {
            item: "Hamburguer",
            quantity: 3,
            icon: "HamburguerIcon"
        },
        {
            item: "Hotdogs",
            quantity: 2,
            icon: "HotDogIcon"
        }, {
            item: "Quesadillas",
            quantity: 5,
            icon: "QuesadillasIcon"
        },
        {
            item: "Panuchos",
            quantity: 2,
            icon: "PanuchosIcon"
        }, {
            item: "Salbutes",
            quantity: 3,
            icon: "SalbutesIcon"
        },
        {
            item: "Empanadas",
            quantity: 2,
            icon: "EmpanadasIcon"
        }
    ];

    // useEffect(() => {
    //     var url = 'https://jsonplaceholder.ir/users/1';

    //     fetch(url, {
    //         method: 'GET', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //         .catch(error => console.error('Error:', error))
    //         .then(response => {
    //             console.log('Success:', console.log(response))
    //             setItemsList(response.)
    //         });
    // }, [])

    const list = items.map(items => <ListItem key={items.item} item={items.item} quantity={items.quantity} icon={items.icon} />)
    return (
        <div className='Container'>
            <header>
                <div className='OrderInfo'>
                    <p>Order ID: {orderId} </p>
                    <p>Date of order: </p>
                </div>
                <div className='CourierInfo'>
                    <p>Courier ID: </p>
                    <p>Courier name: </p>
                </div>
                <div className='ClientInfo'>
                    <p>Client ID:</p>
                    <p>Client name:</p>
                </div>
            </header>
            <main>
                {list}
            </main>
        </div>
    )
}

export default OrderInfoContainer;