import React, { useEffect, useState } from 'react';

// Styles
import './styles.css';

// Components
import ListItem from '../ListItem';

// Context custom hook
import { useDataContext } from '../../context/IncommingOrderContext';

type Props = {
    orderId: string;
}

export const OrderInfoContainer = ({ orderId }: Props) => {

    // Bring data from the orders list using the context
    const { ordersList } = useDataContext();
    // Find the order by using the orderID of the clicked order
    const found = ordersList?.find((order: any) => order.id == orderId);
    // Get the date and format it
    const orderDate = new Date(found?.createdAt);
    const orderDateDate = orderDate.toDateString();
    const orderDateTime = orderDate.toLocaleTimeString();

    // State Variables
    const [itemsList, setItemsList] = useState([]);
    const [clientName, setClientName] = useState("");
    const [courierName, setCourierName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const url = `http://localhost:3010/orderitems/${orderId}`;
        // Bring the the items of the selected order from the API
        const fetchItemsList = async () => {
            const req = await fetch(url);
            const res = await req.json();
            setItemsList(res);
        }

        fetchItemsList().catch(console.error);

        setClientName(found?.Customer.full_name);
        setCourierName(found?.courier.full_name);
        setAddress(found?.Customer.ClientAddress.address);
        setDate(orderDateDate.concat(" ", orderDateTime));
        setPrice(Number());
    }, [])

    // Map to create the item component depending on the amunt of items of each order
    const list = itemsList?.map((items: any) => <ListItem key={items.id} item={items.Item.name} quantity={items.quantity} price={items.Item.price} />);

    return (
        <div className='Container'>
            <header>
                <div className='OrderInfo'>
                    <p>Order ID: {orderId} </p>
                    <p>Date of order: {date}</p>
                </div>
                <div className='CourierInfo'>
                    <p>Client name: {clientName} </p>
                    <p>Courier name: {courierName} </p>
                </div>
                <div className='ClientInfo'>
                    <p>Address: {address} </p>
                    <p>Total price: ${ }</p>
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