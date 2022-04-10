import React from 'react'
import {
    CToast,
    CToastBody,
    CToastClose
} from '@coreui/react'


const Toaster = (props) => {
    return (
        <CToast autohide={false} visible={props.isLoading} color={props.color} className="text-white align-items-center">
            <div className="d-flex">
                <CToastBody>{props.message}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>

    )

}

export { Toaster }