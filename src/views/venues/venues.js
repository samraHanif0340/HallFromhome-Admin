import React from 'react';
// import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL } from 'src/utilities/constants';
import { Container } from "reactstrap"
import GridComponent from 'src/components/shared-components/GridComponent';
import { VenueButtons } from 'src/components/shared-components/ButtonComponents';


const Venues = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const doFetch = async () => {
          const response = await fetch(BASE_URL+'GetVenueList');
        // const response = await fetch("https://randomuser.me/api/?results=100")
          const body = await response.json();
          const venuesList = body.Result_DTO;
          console.log(venuesList);
          setData(venuesList);
        };
        doFetch();
      }, []);
 
      const [columns] = React.useState([
        { field: "VenueName" ,headerName: "Venue Name",},
        { field: "VenueTypeDesc",headerName: "Venue Type", },
        { field: "CityDesc",headerName: "City",},
        { field: "RentPrice",headerName: "Price Per Event",},
        { field: "MaxCapacity",headerName: "Max Persons Allowed",},
        // {  width: 150, headerName: "Download Image", field:'link', cellRenderer: DownloadImageLink,pinned:'right'},
        { field: "action", headerName:'Actions',cellRenderer: VenueButtons ,pinned:'right'}
    ]);  

    return (
        <>
        <Container>
        {React.useMemo(()=><GridComponent columnDefs={columns} gridData={data}/>,[columns,data])}
        </Container>
           
        </>
    );
};

export default Venues;