import React from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL,ERROR_MESSAGES } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { VenueOwnerButtons } from 'src/components/shared-components/ButtonComponents';
import {Toaster} from '../../utilities/helper'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner
} from '@coreui/react'
import axios from 'axios';
const source = axios.CancelToken.source();

const VenueOwners = () => {
    const [data, setData] = React.useState([]);
    let [row, setRow] = React.useState(null)
    let [showACModal, setShowACModal] = React.useState(false)
    let [showBCModal, setShowBCModal] = React.useState(false)
    let [isLoading, setIsLoading] = React.useState(false);
    let [showToaster, setshowToaster] = React.useState({toasterData:{}});

    React.useEffect(() => {
        getOwnerList();
      }, []);
 
      const [columns] = React.useState([
        { field: "Name" ,headerName: "Owner Name",},
        { field: "EmailAddress",headerName: "Email", },
        { field: "PhoneNumber",headerName: "Contact No.",},
        { field: "VenueNames",headerName: "Venues", width: 300},
        { field: "CNIC",headerName: "CNIC",},
        { field: "CityDesc",headerName: "City",},
        { field: "IsActive",headerName: "Active",},
        { field: "VenueCount",headerName: "Total Venues",pinned:'right'},
        { field: "action", headerName:'Actions',cellRenderer: VenueOwnerButtons ,pinned:'right'}
    ]);  

    const performActiveOwners = (childData, showModal) => {
      setRow(childData)
      setShowACModal(showModal)  
    }
  
    const performBlockOwners = (childData, showModal) => {
      setRow(childData)
      setShowBCModal(showModal)
    }

    const goForActiveOwner = () => {
      let payload = {       
        UserID: row.ID,
        ActiveStatus: true,
        AdminID: 1
    }
      activeDeactiveService(payload)
    }
  
    const goForBlockOwner = () => {
      let payload = {       
        UserID: row.ID,
        ActiveStatus: false,
        AdminID: 1
    }
      activeDeactiveService(payload)
    }

    const activeDeactiveService = async (data) => {
      let formData = Object.assign({}, data)
      let configurationObject = {
        url: `${BASE_URL}ActivateUser`,
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
          setShowACModal(false)
          setShowBCModal(false)
        setshowToaster({toasterData:{toaster:true,color:'success',message:response.data.ResponseDesc}})
          getOwnerList()
  
          return;
        } else {
          setIsLoading(false);
          setShowACModal(false)
          setShowBCModal(false)
        setshowToaster({toasterData:{toaster:true,color:'danger',message:response.data.ResponseDesc}})
        }
      } catch (error) {
        setIsLoading(false);
        setShowACModal(false)
        setShowBCModal(false)
        setshowToaster({toasterData:{toaster:true,color:'danger',message:ERROR_MESSAGES.CATCH_ERROR}})

      }
    };

    const getOwnerList = async () => {
      const response = await fetch(BASE_URL + 'GetVenueOwnerList');
      const body = await response.json();
      const customerList = body.Result_DTO;
     
      for(let i=0;i<customerList.length;i++){
        let venueNames = []
        let venueString = ''
        for(let j=0;j<customerList[i].VenueList.length;j++){
          venueNames.push(customerList[i].VenueList[j].VenueName)
        }
        venueString = venueNames.join(',')
        customerList[i].VenueNames = venueString
      }
      console.log(customerList);
      setData(customerList);
    };

    return (
        <>
    { isLoading ? <CSpinner color="primary"/> : null}
    {showToaster && showToaster.toasterData && showToaster.toasterData.toaster ? <Toaster isLoading={showToaster.toasterData.toaster} color={showToaster.toasterData.color} message={showToaster.toasterData.message}/> : null}

      {/* ACTIVE CUSTOMER MODAL */}
      <CModal alignment="center" visible={showACModal} onClose={() => setShowACModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Active the selected Owner? By Clicking Yes, {row && row.Name ? row.Name.toUpperCase() : 'the selected venue owner'} can perform all the operations on their added venues and cna avail all your services.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowACModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForActiveOwner}>Yes</CButton>
        </CModalFooter>
      </CModal>

      {/* BLOCK CUSTOMER MODAL */}
      <CModal alignment="center" visible={showBCModal} onClose={() => setShowBCModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Block the selected Owner? By Clicking Yes, {row && row.Name ? row.Name.toUpperCase() : 'the selected venue owner'} will no longer use your services and all of theirs venues will be blocked from the public listing too.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowBCModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForBlockOwner}>Yes</CButton>
        </CModalFooter>
      </CModal>

        <Container>
        <h3>Venue Owners</h3>
        {React.useMemo(()=><GridComponent 
        columnDefs={columns} 
        gridData={data}
        activeVenueOwners={performActiveOwners}
        blockVenueOwners={performBlockOwners}
        />,[columns,data])}
        </Container>
           
        </>
    );
};

export default VenueOwners;