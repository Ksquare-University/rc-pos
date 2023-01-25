import React from 'react';
import { Button } from '@mui/material';
import './style.css';

type Props = {
    isDisabled: boolean;
    handleOnClick: VoidFunction;
}

export const CancelBttn = ({ isDisabled, handleOnClick }: Props) => {


    return (
        <Button className='ActiveCancel'
            disabled={isDisabled}
            onClick={handleOnClick}>Cancel
        </Button>
    )
}

export default CancelBttn;