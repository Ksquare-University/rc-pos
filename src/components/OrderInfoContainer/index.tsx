import React, { useEffect, useState } from 'react'
import './styles.css'
import ListItem from '../ListItem'

type Props = {
    orderId: string;
}

export const OrderInfoContainer = ({ orderId }: Props) => {

    // State Variables
    const [itemsList, setItemsList] = useState([])

    // const items = [
    //     {
    //         item: "Hamburguer",
    //         quantity: 3,
    //         icon: "HamburguerIcon"
    //     },
    //     {
    //         item: "Hotdogs",
    //         quantity: 2,
    //         icon: "HotDogIcon"
    //     }, {
    //         item: "Quesadillas",
    //         quantity: 5,
    //         icon: "QuesadillasIcon"
    //     },
    //     {
    //         item: "Panuchos",
    //         quantity: 2,
    //         icon: "PanuchosIcon"
    //     }, {
    //         item: "Salbutes",
    //         quantity: 3,
    //         icon: "SalbutesIcon"
    //     },
    //     {
    //         item: "Empanadas",
    //         quantity: 2,
    //         icon: "EmpanadasIcon"
    //     }
    // ];

    useEffect(() => {
        const url = 'http://localhost:3010/orderitems/2';

        const fetchItemsList = async () => {
            const req = await fetch(url);
            const res = await req.json()
            setItemsList(res)
            console.log(res)
        }

        fetchItemsList().catch(console.error)
    }, [])

    const list = itemsList.map((items: any) => <ListItem key={items.id} item={items.Item.name} quantity={items.quantity} price={items.Item.price} />)
    return (
        <div className='Container'>
            <header>
                <div className='OrderInfo'>
                    <p>Order ID: {orderId} </p>
                    <p>Date of order: </p>
                </div>
                <div className='CourierInfo'>
                    <p>Client name: </p>
                    <p>Courier name: </p>
                </div>
                <div className='ClientInfo'>
                    <p>Address:</p>
                    <p>Total price: $</p>
                </div>
            </header>
            <main>
                <div className='ListItemsHeader'>
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                </div>
                {list}
            </main>
        </div>
    )
}
export default OrderInfoContainer;