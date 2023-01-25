import React from 'react'
import './style.css'

type Props = {
    state: boolean;
    reason: string;
}

export const SuccessMsg = ({ state, reason }: Props) => {
    return (
        <>
            {state &&
                <div className='MainContainerMsg'>
                    <div className="SuccessMsg">
                        <h1>Cancelation completed!</h1>
                        <p className='Order'>
                            Reason: {reason}
                        </p>
                    </div>
                </div>

            }
        </>
    )
}

export default SuccessMsg;