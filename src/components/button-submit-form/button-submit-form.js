import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import './button-submit-form.css';

export default function ButtonSubmitForm(props) {

    return (
        <Button variant="contained" fullWidth className="btn-form" onClick={!props.loading ? props.function : () => {}}>
            {props.loading ? <CircularProgress classes="color-circular" disableShrink size="1.7em" /> : props.text}
        </Button>
    );
}

