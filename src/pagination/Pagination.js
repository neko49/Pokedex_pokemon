import React from 'react';
import { Button } from '@material-ui/core'
import './pagination.css'


function Paginate(props) {

    const handlePage = () =>
    {
        props.onChangePage();
    }


    return(
        <>
            <Button variant="contained" size="large" onClick={handlePage}>
                {props.type}
            </Button>
        </>
    )
}

export default Paginate