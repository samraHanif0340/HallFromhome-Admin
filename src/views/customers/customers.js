import React from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL, ERROR_MESSAGES } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { CustomerButtons } from 'src/components/shared-components/ButtonComponents';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner
} from '@coreui/react'
import {Toaster} from '../../utilities/helper'


import axios from 'axios';
const source = axios.CancelToken.source();


const Customers = () => {
    const [data, setData] = React.useState([]);
    let [row, setRow] = React.useState(null)
    let [showACModal, setShowACModal] = React.useState(false)
    let [showBCModal, setShowBCModal] = React.useState(false)
    let [isLoading, setIsLoading] = React.useState(false);
    let [showToaster, setshowToaster] = React.useState({toasterData:{}});




    React.useEffect(() => {    
      getCustomerList();
      }, []);

    const [columns] = React.useState([
        { field: "Name" ,headerName: "Customer Name",width:160},
        { field: "EmailAddress",headerName: "Email", width:220},
        { field: "PhoneNumber",headerName: "Contact No.",},
        { field: "CNIC",headerName: "CNIC",},
        { field: "CityDesc",headerName: "City",},
        { field: "IsActive",headerName: "Active",},
        { field: "action", headerName:'Actions',cellRenderer: CustomerButtons ,pinned:'right'}
    ]); 
    
    const performActiveCustomers = (childData, showModal) => {
      setRow(childData)
      setShowACModal(showModal)
    }
  
    const performBlockCustomers = (childData, showModal) => {
      setRow(childData)
      setShowBCModal(showModal)
    }

    const goForActiveCustomer = () => {
      let payload = {
        
          UserID: row.ID,
          ActiveStatus: true,
          AdminID: 1
      }
      activeDeactiveService(payload)
    }
  
    const goForBlockCustomer = () => {
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
          getCustomerList()
  
          // Snackbar.show({
          //   text: response.data.ResponseDesc,
          //   duration: Snackbar.LENGTH_LONG,
          // });
  
          return;
        } else {
          setIsLoading(false);
          setShowACModal(false)
          setShowBCModal(false)
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
        setShowACModal(false)
        setShowBCModal(false)
        setshowToaster({toasterData:{toaster:true,color:'danger',message:ERROR_MESSAGES.CATCH_ERROR}})

      }
    };

    const getCustomerList = async () => {
      const response = await fetch(BASE_URL + 'GetCustomerList');
      // const response = await fetch("https://randomuser.me/api/?results=100")
      const body = await response.json();
      const customerList = body.Result_DTO;
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
          Are you sure you want to Active the selected Customer? By Clicking Yes, {row && row.Name ? row.Name.toUpperCase() : 'the selected customer'} can use all your services.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowACModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForActiveCustomer}>Yes</CButton>
        </CModalFooter>
      </CModal>

      {/* BLOCK CUSTOMER MODAL */}
      <CModal alignment="center" visible={showBCModal} onClose={() => setShowBCModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to Block the selected Customer? By Clicking Yes, {row && row.Name ? row.Name.toUpperCase() : 'the selected customer'} will no longer use your services.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowBCModal(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={goForBlockCustomer}>Yes</CButton>
        </CModalFooter>
      </CModal>
        <Container>
        <h3>Customers</h3>
        {React.useMemo(()=><GridComponent 
        columnDefs={columns} 
        gridData={data}
        activeVenueCustomers={performActiveCustomers}
        blockVenueCustomers={performBlockCustomers}
        />,[columns,data])}
        </Container>
           
        </>
    );
};

export default Customers;