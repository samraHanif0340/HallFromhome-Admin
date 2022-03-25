import React, {useState}from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { VenueButtons } from 'src/components/shared-components/ButtonComponents';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import axios from 'axios';
const source = axios.CancelToken.source();

const Venues = () => {
    const [data, setData] = React.useState([]);   
    let [row,setRow] = React.useState(null)
    let [showApproveModal,setShowApproveModal] = useState(false)
    let [showRejectModal,setShowRejectModal] = useState(false)
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
     
        getVenueList();
      }, []);

      const performApprovedMethod = (childData,showModal) => {
        setRow(childData)
        setShowApproveModal(showModal)      
      }

      const performRejectMethod = (childData,showModal) => {
        setRow(childData)
        setShowRejectModal(showModal)      
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
 
 
      const [columns] = React.useState([
        { field: "VenueName" ,headerName: "Venue Name",},
        { field: "VenueTypeDesc",headerName: "Venue Type", },
        { field: "CityDesc",headerName: "City",},
        { field: "RentPrice",headerName: "Price Per Event",},
        { field: "MaxCapacity",headerName: "Max Persons Allowed",},
        { field: "IsActive",headerName: "Active",},
        { field: "VenueStatus",headerName: "Venue Status", pinned:'right'},
        { field: "action", headerName:'Actions',cellRenderer: VenueButtons ,pinned:'right'}
    ]);  

    const approveRejectService = async (data) => {
      let formData = Object.assign({}, data)
      let configurationObject = {
        url: `${BASE_URL}ApproveRejectVenue`,
        method: "POST",
        cancelToken: source.token,
        data: { ...formData}
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
      }
    };

    const getVenueList = async () => {
      const response = await fetch(BASE_URL+'GetVenueList');
    // const response = await fetch("https://randomuser.me/api/?results=100")
      const body = await response.json();
      const venuesList = body.Result_DTO;
      console.log(venuesList);
      setData(venuesList);
    };
 
    return (
        <>
        {/* APPROVE VENUE MODAL */}
        <CModal alignment="center" visible={showApproveModal} onClose={() => setShowApproveModal(false)}>
          <CModalHeader>
            <CModalTitle>Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>
           Are you sure you want to Approve the selected Venue? By Clicking Yes, {row && row.venueName ? row.VenueName.toUpperCase() : 'the selected venue'} will be enabled in public listing.
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowApproveModal(false)}>
              No
            </CButton>
            <CButton color="success" onClick={goForApproval}>Yes</CButton>
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
            <CButton color="success" onClick={goForRejection}>Yes</CButton>
          </CModalFooter>
        </CModal>


        <Container>
          <h3>Venues</h3>
        {React.useMemo(()=><GridComponent approveVenuesEmitter={performApprovedMethod} rejectVenuesEmitter={performRejectMethod} columnDefs={columns} gridData={data}/>,[columns,data])}
        </Container>
           
        </>
    );
};

export default Venues;