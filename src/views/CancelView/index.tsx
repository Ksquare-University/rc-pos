// Import React Stuff
import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// Import components
import BackBttn from '../../components/BackBttn';
import CancelForm from '../../components/CancelForm';


// Styles
import './style.css'

// Import everything related to the incomming order view
import IncommingOrderView from '../IncommingOrderView';
import { useDataContext } from '../../context/IncommingOrderContext';

export const CancelView = () => {
    // Related to params
    const obj = useParams();
    const orderID = String(obj.orderId)

    // Context of the incomming order view
    const context = useDataContext();

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toOrderView = location.pathname && `/orderView/${orderID}`;

    // Handlers
    const handleOnBack = () => {
        console.log("back!");
        navigate(toOrderView, { replace: true });
    }

    const handleOnNewOrderClick = () => {
        context.setIsIncommingOrder(!context.isIncommingOrder)
    }

    return (
        <div className='body'>
            <header className='header'>
                <div className='BkbttnContainer'><BackBttn handleOnClick={handleOnBack} /></div>
            </header>
            <main className='main'>
                <div className='CancelContainer'>
                    <h1>Select a reason</h1>
                    <CancelForm />
                </div>
            </main>
            <IncommingOrderView state={context.isIncommingOrder} handleOnClick={handleOnNewOrderClick} />
        </div>
    )
}

export default CancelView;