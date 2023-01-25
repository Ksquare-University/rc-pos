// Import React Stuff
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';

// Import components
import SendBttn from '../SendBttn';

// Styles
import './style.css'
import SuccessMsg from '../../views/SuccessMsg';

export const CancelForm = () => {

    // Option type
    type Option = {
        label: string;
        value: string;
    }

    // Options of the select input
    const options: Option[] = [
        { label: '--Select a reason--', value: '' },
        { label: 'Option1', value: 'option1' },
        { label: 'Option2', value: 'option2' },
        { label: 'Option3', value: 'option3' },
    ]

    // Stuff to control the form
    const { handleSubmit, control, register } = useForm();

    // State variables
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toOrdersView = location.pathname && `/orders`;

    // Handlers
    const handleOnSubmit = (data: any) => {
        if (data.Options.value != "") {
            console.log("Submit");
            console.log(data.Options.value)
            setIsDisabled(true)
            setTimeout(() => {
                setIsDisabled(false)
                navigate(toOrdersView, { replace: true })
            }, 3000);
        }
        else {
            console.log("Select an option!")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Controller
                defaultValue={options[0]}
                control={control}
                name="Options"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        defaultValue={options[0]}
                        options={options}
                        onChange={onChange}
                    />
                )}
            />
            <SendBttn isDisabled={isDisabled} />
            <SuccessMsg state={isDisabled} reason={control._fields.Options?._f.value.label} />
        </form>
    )
}

export default CancelForm;
