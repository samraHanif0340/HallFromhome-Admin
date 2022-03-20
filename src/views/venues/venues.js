import React from 'react';
import TableContainer from 'src/components/shared-components/TableContainer';
import { BASE_URL } from 'src/utilities/constants';
import { Container } from "reactstrap"


const Venues = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const doFetch = async () => {
          const response = await fetch(BASE_URL+'GetVenueList');
        // const response = await fetch("https://randomuser.me/api/?results=100")
          const body = await response.json();
          const contacts = body.Result_DTO;
          console.log(contacts);
          setData(contacts);
        };
        doFetch();
      }, []);
    const columns = React.useMemo(
        () => [
          {
            Header: 'Venue Name',
            accessor: 'VenueName',
          },
          {
            Header: 'Venue Type',
            accessor: 'VenueTypeDesc',
          },
          {
            Header: 'Price per occassion',
            accessor: 'RentPrice',
          },
          {
            Header: 'Max Persons Allowned',
            accessor: 'MaxCapacity',
          },
          {
            Header: 'City',
            accessor: 'CityDesc',
          },
          {
            Header: 'Action',
            accessor: '[row identifier to be passed to button]',
            Cell: ({value}) => (<><button onClick={()=>console.log('approved click')}>Approve</button> <button onClick={()=>console.log('reject click')}>Reject</button><button onClick={()=>console.log('view click')}>View</button></>)
          },
        ],
        []
      );

    //   const columns = React.useMemo(
    //     () => [
    //       {
    //         Header: "Title",
    //         accessor: "name.title",
    //       },
    //       {
    //         Header: "First Name",
    //         accessor: "name.first",
    //       },
    //       {
    //         Header: "Last Name",
    //         accessor: "name.last",
    //       },
    //       {
    //         Header: "Email",
    //         accessor: "email",
    //       },
    //       {
    //         Header: "City",
    //         accessor: "location.city",
    //       },
    //     ],
    //     []
    //   )
    return (
        <>
        <Container>
        <TableContainer columns={columns} data={data}/>
        </Container>
           
        </>
    );
};

export default Venues;