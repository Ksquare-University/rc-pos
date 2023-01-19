import React from 'react'
import Timer from '../../components/TimerIncommingView';
import './style.css'

type Props = {
    state: boolean;
    handleOnClick: VoidFunction;

}

export const IncommingOrderView = ({ state, handleOnClick }: Props) => {
    return (
        <>
            {state &&
                <div className='MainContainer' onClick={handleOnClick}>
                    <p className='Order'>
                        Accept Order
                    </p>
                    <div className='TimerContainer'>
                        <Timer />

                    </div>

                </div>

            }
        </>
    )
}

export default IncommingOrderView;