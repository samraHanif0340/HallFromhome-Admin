import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faCircleCheck ,faBan,faCircleMinus, faCirclePlus} from '@fortawesome/free-solid-svg-icons'



const VenueButtons = (props) => {      
    const viewVenueDetails = () =>{
        props.context.methodForViewVenues(props.data,true);
    }  

    const approveVenue = () =>{
        props.context.methodForApproveVenues(props.data,true);
    } 

    const rejectVenue = () =>{
        props.context.methodForRejectVenues(props.data,true);
    } 
    
    const disableVenue = () =>{
        props.context.methodForDisableVenues(props.data,true);
    } 

    const enableVenue = () =>{
        props.context.methodForEnableVenues(props.data,true);
    } 
 
    return (
        <>   
        <span className="mx-3" title="View Venue Details" onClick={viewVenueDetails}><FontAwesomeIcon icon={faEye}/></span>
          {props.data.VenueStatus == 'Approved' ? null : <span className="mx-3"  title="Approve Venue" onClick={approveVenue}><FontAwesomeIcon icon={faCircleCheck}/></span>}  
          {props.data.VenueStatus == 'Rejected' || props.data.VenueStatus == 'Approved' ? null :  <span className="mx-3" title="Reject Venue" onClick={rejectVenue}><FontAwesomeIcon icon={faBan}/></span>}
          {props.data.VenueStatus == 'Approved' && props.data.IsActive == '1' ? <span className="mx-3" title="Disable Venue" onClick={disableVenue}><FontAwesomeIcon icon={faCircleMinus}/></span> : null}
          {props.data.VenueStatus == 'Approved' && props.data.IsActive == '0' ? <span className="mx-3" title="Enable Venue" onClick={enableVenue}><FontAwesomeIcon icon={faCirclePlus}/></span> : null}

        </>
    );
};

const VenueOwnerButtons = (props) => {
    const blockVenueOwner = () =>{
        props.context.methodForBlockVenueOwner(props.data,true);
    } 

    const activeVenueOwner = () =>{
        props.context.methodForActiveVenueOwner(props.data,true);
    } 
    return (
        <>
        {/* <span className="mx-3" title="Approve Venue" onClick={favoriteImage}><FontAwesomeIcon icon={faEye}/></span> */}
        {props.data.IsActive == '1' ? null :  <span className="mx-3" title="Active Selected Owner" onClick={activeVenueOwner}><FontAwesomeIcon icon={faCircleCheck}/></span>}
        {props.data.IsActive == '1' ? <span className="mx-3" title="Block Selected Owner" onClick={blockVenueOwner}><FontAwesomeIcon icon={faBan}/></span> : null}
        </>
    );
};

const CustomerButtons = (props) => {
    const blockCustomer = () =>{
        props.context.methodForBlockCustomer(props.data,true);
    } 

    const activeCustomer = () =>{
        props.context.methodForActiveCustomer(props.data,true);
    }  
    return (
        <>
           {props.data.IsActive == '1' ? null : <span className="mx-3" title="Active Selected Customer" onClick={activeCustomer}><FontAwesomeIcon icon={faCircleCheck}/></span>}
           {props.data.IsActive == '1' ? <span className="mx-3" title="Block Selected Customer" onClick={blockCustomer}><FontAwesomeIcon icon={faBan}/></span> : null}
        </>
    );
};



export {VenueButtons,VenueOwnerButtons,CustomerButtons}