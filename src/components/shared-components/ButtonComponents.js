import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faCircleCheck ,faBan} from '@fortawesome/free-solid-svg-icons'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLink,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CPopover,
    CRow,
    CTooltip,
  } from '@coreui/react'
  import { DocsCallout, DocsExample } from 'src/components'



const VenueButtons = (props) => {
    // console.log(props)


    
    const viewVenueDetails = (props) =>{

    }  

    // const goForApproval = () => {
    //     let payload = {
    //             VenueID: props.data.VenueID,
    //             VenueStatus: "A",
    //             VenueRejectionComment: "",
    //             UserID: 1
    //     }
    //     approveRejectService(payload)
    // }

    // const goForRejection = () => {
    //     console.log('Rejection')
    //     let payload = {
    //         VenueID: props.data.VenueID,
    //         VenueStatus: "R",
    //         VenueRejectionComment: "",
    //         UserID: 1
    // }
    // approveRejectService(payload)
    // }

    const approveVenue = () =>{
        props.context.methodForApproveVenues(props.data,true);

    } 

    const rejectVenue = () =>{
        props.context.methodForRejectVenues(props.data,true);
    }

    
 
    return (
        <>
       

        
        <span className="mx-3" title="View Venue Details" onClick={viewVenueDetails}><FontAwesomeIcon icon={faEye}/></span>
            <span className="mx-3" title="Approve Venue" onClick={approveVenue}><FontAwesomeIcon icon={faCircleCheck}/></span>
            <span className="mx-3" title="Reject Venue" onClick={rejectVenue}><FontAwesomeIcon icon={faBan}/></span>
        </>
    );
};

const VenueOwnerButtons = () => {
    const favoriteImage = () =>{
        alert('Selected Image has been favorited')
    }  
    return (
        <>
        {/* <span className="mx-3" title="Approve Venue" onClick={favoriteImage}><FontAwesomeIcon icon={faEye}/></span> */}
            <span className="mx-3" title="Active Selected Owner" onClick={favoriteImage}><FontAwesomeIcon icon={faCircleCheck}/></span>
            <span className="mx-3" title="Block Selected Owner" onClick={favoriteImage}><FontAwesomeIcon icon={faBan}/></span>
        </>
    );
};

const CustomerButtons = () => {
    const favoriteImage = () =>{
        alert('Selected Image has been favorited')
    }  
    return (
        <>
         <span className="mx-3" title="Active Selected Customer" onClick={favoriteImage}><FontAwesomeIcon icon={faCircleCheck}/></span>
            <span className="mx-3" title="Block Selected Customer" onClick={favoriteImage}><FontAwesomeIcon icon={faBan}/></span>
        </>
    );
};



// const RejectButton = (props) => {
//     const DownloadImage = () =>{
//         let imageLink = props.value
//         window.open(imageLink,'_blank')
//     }
    
//     return (      
//          <><button>Reject</button></>     
//     );
// };

export {VenueButtons,VenueOwnerButtons,CustomerButtons}