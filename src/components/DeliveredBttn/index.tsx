import React from 'react';
import { Button } from '@mui/material';
import './style.css';

type Props = {
    isDisabled: boolean;
    handleOnClick: VoidFunction;
}

export const DeliveredBttn = ({ isDisabled, handleOnClick }: Props) => {

    return (
        <Button className='Active' variant="contained"
            disabled={isDisabled}
            onClick={handleOnClick}>Delivered
        </Button>
    )
}

export default DeliveredBttn;