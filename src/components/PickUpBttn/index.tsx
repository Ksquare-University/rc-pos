import React from 'react'
import { Button } from '@mui/material'
import './style.css'

type Props = {
    handleOnClick: VoidFunction;
}

export const PickUpBttn = ({ handleOnClick }: Props) => {

    return (
        <Button className='Active'
            variant="contained"
            onClick={handleOnClick}>Ready for pick up
        </Button>
    )
}

export default PickUpBttn;