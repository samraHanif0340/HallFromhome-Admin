import React from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { CustomerButtons } from 'src/components/shared-components/ButtonComponents';


const Customers = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const doFetch = async () => {
          const response = await fetch(BASE_URL+'GetCustomerList');
        // const response = await fetch("https://randomuser.me/api/?results=100")
          const body = await response.json();
          const venuesList = body.Result_DTO;
          console.log(venuesList);
          setData(venuesList);
        };
        doFetch();
      }, []);
 
      const [columns] = React.useState([
        { field: "Name" ,headerName: "Customer Name",},
        { field: "EmailAddress",headerName: "Email", },
        { field: "PhoneNumber",headerName: "Contact No.",},
        { field: "CNIC",headerName: "CNIC",},
        { field: "CityDesc",headerName: "City",},
        { field: "IsActive",headerName: "Active",},
        { field: "action", headerName:'Actions',cellRenderer: CustomerButtons ,pinned:'right'}
    ]);  

    return (
        <>
        <Container>
        <h3>Customers</h3>
        {React.useMemo(()=><GridComponent columnDefs={columns} gridData={data}/>,[columns,data])}
        </Container>
           
        </>
    );
};

export default Customers;