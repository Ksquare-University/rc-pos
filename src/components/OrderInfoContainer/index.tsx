import React from 'react'
import './styles.css'
import ListItem from '../ListItem'

type Props = {
    orderId: string;
}

export const OrderInfoContainer = ({ orderId }: Props) => {
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
    ]
    const list = items.map(items => <ListItem key={items.item} item={items.item} quantity={items.quantity} icon={items.icon} />)
    return (
        <div className='Container'>
            <header>
                <div className='OrderInfo'>
                    <p>Order id: </p>
                    <p>Date of order: </p>
                </div>
                <div className='CourierInfo'>
                    <p>Courier id: </p>
                    <p>Courier name: </p>
                </div>
                <div className='ClientInfo'>
                    <p>Client id:</p>
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