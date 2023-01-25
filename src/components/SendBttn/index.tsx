import React from 'react';
import { Button } from '@mui/material';
import './style.css';

type Props = {
    isDisabled: boolean;
}

export const SendBttn = ({ isDisabled }: Props) => {
    return (
        <Button type='submit' className='SendBttn'
            disabled={isDisabled}
        >Send
        </Button>
    )
}

export default SendBttn;
