import React, { useState } from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL,ERROR_MESSAGES } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { VenueButtons } from 'src/components/shared-components/ButtonComponents';
import {Toaster} from '../../utilities/helper'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner
} from '@coreui/react'

import axios from 'axios';
const source = axios.CancelToken.source();

const Venues = () => {
  const [data, setData] = React.useState([]);
  let [row, setRow] = React.useState(null)
  let [eachVenueInfo, setEachVenueInfo] = React.useState(null)

  let [showApproveModal, setShowApproveModal] = useState(false)
  let [showRejectModal, setShowRejectModal] = useState(false)
  let [showViewModal, setShowViewModal] = useState(false)
  let [showDisableModal, setShowDisableModal] = useState(false)
  let [showEnableModal, setShowEnableModal] = useState(false)
  let [isLoading, setIsLoading] = React.useState(false);
  let [showToaster, setshowToaster] = React.useState({toasterData:{}});


  React.useEffect(() => {
    getVenueList();
  }, []);

  const [columns] = React.useState([
    { field: "VenueName", headerName: "Venue Name"},
    { field: "VenueTypeDesc", headerName: "Venue Type", },
    { field: "CityDesc", headerName: "City", },
    { field: "RentPrice", headerName: "Price Per Event", },
    { field: "MaxCapacity", headerName: "Max Persons Allowed", },
    { field: "IsActive", headerName: "Active", },
    { field: "VenueStatus", headerName: "Venue Status", pinned: 'right' },
    { field: "action", headerName: 'Actions', width:180, cellRenderer: VenueButtons, pinned: 'right' }
  ]);


  const performViewVenueMethod = (childData, showModal) => {
    setRow(childData)
    getEachVenueInfo(childData.VenueID)
    setShowViewModal(showModal)

  }

  const performApprovedMethod = (childData, showModal) => {
    setRow(childData)
    setShowApproveModal(showModal)
  }

  const performRejectMethod = (childData, showModal) => {
    setRow(childData)
    setShowRejectModal(showModal)
  }

  const performDisableVenueMethod = (childData, showModal) => {
    setRow(childData)
    setShowDisableModal(showModal)
  }

  const performEnableVenueMethod = (childData, showModal) => {
    setRow(childData)
    setShowEnableModal(showModal)
  }

  const goForApproval = () => {
    let payload = {
      VenueID: row.VenueID,
      VenueStatus: "A",
      VenueRejectionComment: "",
      UserID: 1
    }
    approveRejectService(payload)
  }

  const goForRejection = () => {
    let payload = {
      VenueID: row.VenueID,
      VenueStatus: "R",
      VenueRejectionComment: "",
      UserID: 1
    }
    approveRejectService(payload)
  }

  const goForDisable = () => {
    let payload = {
      VenueID: row.VenueID,
      ActiveStatus: false,
      AdminID: 1
    }
    activeDeactiveService(payload)
  }

  const goForEnable = () => {
    let payload = {
      VenueID: row.VenueID,
      ActiveStatus: true,
      AdminID: 1
    }
    activeDeactiveService(payload)
  }

  //SERVICES
  const approveRejectService = async (data) => {
    let formData = Object.assign({}, data)
    let configurationObject = {
      url: `${BASE_URL}ApproveRejectVenue`,
      method: "POST",
      cancelToken: source.token,
      data: { ...formData }
    }

    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        setIsLoading(false);
        setShowApproveModal(false)
        setShowRejectModal(false)
        setshowToaster({toasterData:{toaster:true,color:'success',message:response.data.ResponseDesc}})
        getVenueList()

        // Snackbar.show({
        //   text: response.data.ResponseDesc,
        //   duration: Snackbar.LENGTH_LONG,
        // });

        return;
      } else {
        setIsLoading(false);
        setShowApproveModal(false)
        setShowRejectModal(false)
        setshowToaster({toasterData:{toaster:true,color:'danger',message:response.data.ResponseDesc}})

        // Snackbar.show({
        //   text: response.data.ResponseDesc,
        //   duration: Snackbar.LENGTH_LONG,
        //   action: {
        //     text: 'OK',
        //     textColor: 'white',
        //     onPress: () => { /* Do something. */ },
        //   },
        // });
      }
    } catch (error) {
      setIsLoading(false);
      setShowApproveModal(false)
      setShowRejectModal(false)
      setshowToaster({toasterData:{toaster:true,color:'danger',message:ERROR_MESSAGES.CATCH_ERROR}})

    }
  };

  const activeDeactiveService = async (data) => {
    let formData = Object.assign({}, data)
    let configurationObject = {
      url: `${BASE_URL}ActivateVenue`,
      method: "POST",
      cancelToken: source.token,
      data: { ...formData }
    }

    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        setIsLoading(false);
        setShowDisableModal(false)
        setShowEnableModal(false)
        setshowToaster({toasterData:{toaster:true,color:'success',message:response.data.ResponseDesc}})
        getVenueList()
        return;
      } else {
        setIsLoading(false);
        setShowDisableModal(false)
        setShowEnableModal(false)
        setshowToaster({toasterData:{toaster:true,color:'danger',message:response.data.ResponseDesc}})
      }
    } catch (error) {
      setIsLoading(false);
      setShowDisableModal(false)
      setShowEnableModal(false)
      setshowToaster({toasterData:{toaster:true,color:'danger',message:ERROR_MESSAGES.CATCH_ERROR}})


    }
  };

  const getEachVenueInfo = async (id) => {
    let configurationObject = {
      url: `${BASE_URL}GetVenueInfo`,
      method: "POST",
      cancelToken: source.token,
      data: { VenueID: id }
    }

    try {
      setIsLoading(true);
      const response = await axios(
        configurationObject,
      );
      if (response.data.ResponseCode === "00") {
        setIsLoading(false);
        setEachVenueInfo(response.data.Result_DTO)

        // Snackbar.show({
        //   text: response.data.ResponseDesc,
        //   duration: Snackbar.LENGTH_LONG,
        // });

        return;
      } else {
        setIsLoading(false);
        setShowApproveModal(false)
        setShowRejectModal(false)
        // Snackbar.show({
        //   text: response.data.ResponseDesc,
        //   duration: Snackbar.LENGTH_LONG,
        //   action: {
        //     text: 'OK',
        //     textColor: 'white',
        //     onPress: () => { /* Do something. */ },
        //   },
        // });
      }
    } catch (error) {
      setIsLoading(false);

    }
  };

  const getVenueList = async () => {
    setIsLoading(true)
    const response = await fetch(BASE_URL + 'GetVenueList');
    setIsLoading(false)
    const body = await response.json();
    const venuesList = body.Result_DTO;
    console.log(venuesList);
    setData(venuesList);
  };

  return (
    <>
    { isLoading ? <CSpinner size="lg" color="primary"/> : null}
    {showToaster && showToaster.toasterData && showToaster.toasterData.toaster ? <Toaster isLoading={showToaster.toasterData.toaster} color={showToaster.toasterData.color} message={showToaster.toasterData.message}/> : null}
      {/* APPROVE VENUE MODAL */}
      <CModal alignment="center" visible={showApproveModal} onClose={() => setShowApproveModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Approve the selected Venue? By Clicking Yes, {row && row.VenueName ? row.VenueName.toUpperCase() : 'the selected venue'} will be enabled in public listing.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowApproveModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForApproval}>Yes</CButton>
        </CModalFooter>
      </CModal>

      {/* REJECT VENUE MODAL */}
      <CModal alignment="center" visible={showRejectModal} onClose={() => setShowRejectModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Reject the selected Venue? By Clicking Yes, {row && row.VenueName ? row.VenueName.toUpperCase() : 'the selected venue'} will be removed.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowRejectModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForRejection}>Yes</CButton>
        </CModalFooter>
      </CModal>

       {/* DISABLE VENUE MODAL */}
       <CModal alignment="center" visible={showDisableModal} onClose={() => setShowDisableModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Disable the selected Venue? By Clicking Yes, {row && row.VenueName ? row.VenueName.toUpperCase() : 'the selected venue'} will be disabled from the Application.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDisableModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForDisable}>Yes</CButton>
        </CModalFooter>
      </CModal>

       {/* ENABLE VENUE MODAL */}
       <CModal alignment="center" visible={showEnableModal} onClose={() => setShowEnableModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Enable the selected Venue? By Clicking Yes, {row && row.VenueName ? row.VenueName.toUpperCase() : 'the selected venue'} will be enabled for the Application.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEnableModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForEnable}>Yes</CButton>
        </CModalFooter>
      </CModal>

      {/* VIEW VENUE MODAL */}
      <CModal size="xl" alignment="center" scrollable visible={showViewModal} onClose={() => setShowViewModal(false)}>
        <CModalHeader>
          <CModalTitle>Venue Details</CModalTitle>
        </CModalHeader>
        {eachVenueInfo ? <CModalBody>
          <CCard className="mb-4">
            <CCardBody>
              <div className="row">
                <div className="col-lg-6">
                  <strong>Venue Name: </strong> <span>{eachVenueInfo.VenueName}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Venue Type: </strong><span>{eachVenueInfo.VenueTypeDesc}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Rent Price: </strong><span>{eachVenueInfo.RentPrice}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Max Persons Allowed: </strong><span>{eachVenueInfo.MaxCapacity}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Address: </strong><span>{eachVenueInfo.Address}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Area: </strong><span>{eachVenueInfo.AreaDesc}</span>
                </div>
                <div className="col-lg-6">
                  <strong>City: </strong><span>{eachVenueInfo.CityDesc}</span>
                </div>
                <div className="col-lg-6">
                  <strong>POC Name: </strong><span>{eachVenueInfo.POCName}</span>
                </div>
                <div className="col-lg-6">
                  <strong>POC Contact: </strong><span>{eachVenueInfo.ContactNumber}</span>
                </div>
                <div className="col-lg-6">
                  <strong>Website: </strong><span>{eachVenueInfo.Website}</span>
                </div>
                <div className="col-lg-4">
                  <strong>Facebook Page: </strong><span>{eachVenueInfo.Facebook_Page}</span>
                </div>
              </div>
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>
              <strong>Internal Services</strong>
            </CCardHeader>
            <CCardBody>
              <ul className="row">
                <li> <strong>{eachVenueInfo.DJ ? 'DJ Services' : 'DJ Services are not available'}</strong> </li>
                <li><strong>{eachVenueInfo.Music_System ? 'Awsome Music System' : 'No Music System Provided'}</strong> </li>
                <li><strong>{eachVenueInfo.Parking ? 'Parking for our valuable guests' : 'Parking Not Available'}</strong> </li>
                <li><strong>{eachVenueInfo.Projector ? 'Projectors' : 'DJ Services are not available'}</strong> </li>
                <li><strong>{eachVenueInfo.SpecialLights ? 'Special Lights for good photography' : 'No Special Lights'}</strong> </li>
                <li><strong>{eachVenueInfo.Stage_Decoration ? 'Awsome Stage Decoration for our couple' : 'No Stage Decoration Provided'}</strong>     </li>
                <li><strong>{eachVenueInfo.Waitress ? 'Waiters & Waitress as well' : 'No Waiters Available'}</strong>    </li>
                <li><strong>{eachVenueInfo.Wifi ? 'Wifi Facility' : 'No Wifi Facility'}</strong>   </li>
                <li><strong>{eachVenueInfo.Air_Condition ? 'Air Condition' : 'No Air Conditions'}</strong>   </li>
              </ul>
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>
              <strong>Is Present in Public Listing</strong>
            </CCardHeader>
            <CCardBody>
              <div className="row">

                <strong>{eachVenueInfo.IsActive ? 'Yes' : 'Not Yet'}</strong>
              </div>
            </CCardBody>
          </CCard>

        </CModalBody> : null}
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

   
      {/* VENUE GRID */}
      <Container>
        <h3>Venues</h3>
      
          <GridComponent
            approveVenuesEmitter={performApprovedMethod}
            rejectVenuesEmitter={performRejectMethod}
            viewVenuesEmitter={performViewVenueMethod}
            disableVenuesEmitter={performDisableVenueMethod}
            enableVenuesEmitter={performEnableVenueMethod}
            columnDefs={columns} gridData={data} />
      </Container>
    </>
  );
};

export default Venues;