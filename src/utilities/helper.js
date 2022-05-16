import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    CToast,
    CToastBody,
    CToastClose
} from '@coreui/react'
import {
    cilUserFollow,
    cilHome,
    cilCheckCircle,
    cilBan,
    cilBook
  } from '@coreui/icons'


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

const getIconsByStatsName = (statsName) => {
    switch (statsName) {
        case 'Pending':
            return <CIcon icon={cilBook} height={36} />
        case 'Approved':
            return <CIcon icon={cilCheckCircle} height={36} />
        case 'Rejected':
            return <CIcon icon={cilBan} height={36} />
        case 'cilPeople':
            return <CIcon icon={cilBook} height={36} />
        case 'Venue Owners':
            return <CIcon icon={cilUserFollow} height={36} />
        case 'Venues':
            return <CIcon icon={cilHome} height={36} />
        default:
            return <CIcon icon={cilBook} height={36} />
    }
}

export { Toaster,getIconsByStatsName }