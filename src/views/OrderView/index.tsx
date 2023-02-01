// Import React Stuff
import React from 'react'
import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// Styles
import './styles.css'

// Import components
import BackBttn from '../../components/BackBttn';
import OrderInfoContainer from '../../components/OrderInfoContainer';
import CancelBttn from '../../components/CancelBttn';
import PickUpBttn from '../../components/PickUpBttn';
import DeliveredBttn from '../../components/DeliveredBttn';

// Import everything related to the incomming order view
import IncommingOrderView from '../IncommingOrderView';
import { useDataContext } from '../../context/IncommingOrderContext';


export const OrderView = () => {
    // Related to params
    const obj = useParams();
    const orderID = String(obj.orderId)

    // Variable to use the conditional rendering
    let button;

    // Variables to change the state of the class to disable the buttons
    let disabledState = false;
    let disabledCancelState = false;

    // State variables
    const [isReadyForPickUp, setIsReadyForPickUp] = useState<boolean>(false);
    const [isDelivered, setIsDelivered] = useState<boolean>(false);
    const [isQRScanned, setIsQRScanned] = useState<boolean>(true);

    // Context of the incomming order view
    const context = useDataContext();

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toCancelView = location.pathname && `/cancelorder/${orderID}`;
    const toOrdersView = location.pathname && `/orders`

    // Handlers
    const handleOnBack = () => {
        navigate(toOrdersView, { replace: true });
    }

    const handleOnCancel = () => {
        if (isQRScanned === false || isDelivered === false) {
            navigate(toCancelView, { replace: true });
        }
    }

    const handleOnPickUp = () => {
        setIsReadyForPickUp(true)
    }
    const handleOnDelivered = () => {
        setIsDelivered(true)
    }

    const handleOnNewOrderClick = () => {
        context.setIsIncommingOrder(!context.isIncommingOrder)
    }

    // Conditions to change the disable state of the buttons
    if (isDelivered === false && isQRScanned === false) {
        disabledCancelState = false;
        disabledState = true;
    }
    else if (isDelivered === false && isQRScanned === true) {
        disabledCancelState = false;
        disabledState = false;
    }
    else if (isDelivered === true && isQRScanned === true) {
        disabledCancelState = true;
        disabledState = true;

    }

    // Conditional Rendering
    if (isReadyForPickUp === false) {
        button = <PickUpBttn handleOnClick={handleOnPickUp} />
    }
    else {
        button = <DeliveredBttn isDisabled={disabledState} handleOnClick={handleOnDelivered} />
    }

    return (
        <>
            <div className='bodyOrder'>
                <div className="wrapperOrder">
                    <header className='header'>
                        <div className='BkbttnContainer'><BackBttn handleOnClick={handleOnBack} /></div>
                        <div className='OrderTitle'>
                            <h1>Order # {orderID}</h1>
                        </div>
                    </header>
                    <main className='main'>
                        <OrderInfoContainer orderId={orderID} />
                    </main>

                    <footer className='footer'>
                        <div className='ButtonsContainer'>
                            <CancelBttn isDisabled={disabledCancelState} handleOnClick={handleOnCancel} />
                            {button}
                        </div>

                    </footer>
                    <IncommingOrderView state={context.isIncommingOrder} handleOnClick={handleOnNewOrderClick} />
                </div>

            </div>

        </>
    )
}

export default OrderView;