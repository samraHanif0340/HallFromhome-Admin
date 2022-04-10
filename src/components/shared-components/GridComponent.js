import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { VenueButtons } from './ButtonComponents';

const GridComponent = (props) => {
console.log(props)
  const gridRef = React.useRef();
    // const [gridData] = React.useState(props.gridData);
    const defaultColDef = React.useMemo(() => {
        return {
          editable: true,
          sortable: true,
          // flex: 1,
          floatingFilter: true,
          resizable: true,
          filter:true,
          width: 150,
        };
      }, []);

      
    // VENUE EVENTS
    const methodForApproveVenues = (row,showApproveModal) =>{
      props.approveVenuesEmitter(row,showApproveModal)  
    }
    const methodForRejectVenues = (row,showRejectModal) =>{
      props.rejectVenuesEmitter(row,showRejectModal)  
    }
    const methodForViewVenues = (row,showViewModal) =>{
      props.viewVenuesEmitter(row,showViewModal)  
    }
    const methodForDisableVenues = (row,showViewModal) =>{
      props.disableVenuesEmitter(row,showViewModal)  
    }
    const methodForEnableVenues = (row,showViewModal) =>{
      props.enableVenuesEmitter(row,showViewModal)  
    }

    // CUSTOMER EVENTS
    const methodForActiveCustomer = (row,showViewModal) =>{
      props.activeVenueCustomers(row,showViewModal)  
    }
    const methodForBlockCustomer = (row,showViewModal) =>{
      props.blockVenueCustomers(row,showViewModal)  
    }

     // VENUE OWNER EVENTS
     const methodForActiveVenueOwner = (row,showViewModal) =>{
      props.activeVenueOwners(row,showViewModal)  
    }
    const methodForBlockVenueOwner = (row,showViewModal) =>{
      props.blockVenueOwners(row,showViewModal)  
    }

    const onFilterTextBoxChanged = React.useCallback(() => {
        gridRef.current.api.setQuickFilter(
          document.getElementById('filter-text-box').value
        );
      }, []);


      const context = {
        methodForApproveVenues: (row,showApproveModal) => methodForApproveVenues(row,showApproveModal),
        methodForRejectVenues: (row,showRejectModal) => methodForRejectVenues(row,showRejectModal), 
        methodForViewVenues: (row,showViewModal) => methodForViewVenues(row,showViewModal),  
        methodForDisableVenues: (row,showViewModal) => methodForDisableVenues(row,showViewModal),  
        methodForEnableVenues: (row,showViewModal) => methodForEnableVenues(row,showViewModal),  


        methodForBlockCustomer: (row,showViewModal) => methodForBlockCustomer(row,showViewModal),       
        methodForActiveCustomer: (row,showViewModal) => methodForActiveCustomer(row,showViewModal),

        methodForActiveVenueOwner: (row,showViewModal) => methodForActiveVenueOwner(row,showViewModal),       
        methodForBlockVenueOwner: (row,showViewModal) => methodForBlockVenueOwner(row,showViewModal),       
      }
    return (
        <>
      
        <div className="container">
        <div className="col-lg-4">
        <input 
        className=" form-control my-3"
            type="text"
            id="filter-text-box"
            placeholder="Search.."
            onInput={onFilterTextBoxChanged}
          />
        </div>
       <div className='row'>
       <div className="ag-theme-alpine" style={{height: 500, width: 1200}}>
           <AgGridReact
           context={context}
            ref={gridRef}
               rowData={props.gridData}
               columnDefs={props.columnDefs}
               pagination={true}
               defaultColDef={defaultColDef}
               rowHeight={50}
               overlayLoadingTemplate={
                '<span class="ag-overlay-loading-center">Loading</span>'
              }
              overlayNoRowsTemplate={
                '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">No Results Found</span>'
              }
              frameworkComponents={{
                VenueButtons
              }}
               >
           </AgGridReact>
       </div>
       </div>
      
        </div>
         
        </>
     
    );
};

export default GridComponent;