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
          flex: 1,
          filter: true,
          resizable: true,
        };
      }, []);
 
    // const [columnDefs] = React.useState(props.columns);  

    const methodForApproveVenues = (row,showApproveModal) =>{
      props.approveVenuesEmitter(row,showApproveModal)  
    }
    const methodForRejectVenues = (row,showRejectModal) =>{
      console.log("IN GRID yooloo ",row,showRejectModal)
      props.rejectVenuesEmitter(row,showRejectModal)  
    }

    const onFilterTextBoxChanged = React.useCallback(() => {
        gridRef.current.api.setQuickFilter(
          document.getElementById('filter-text-box').value
        );
      }, []);


      const context = {
        methodForApproveVenues: (row,showApproveModal) => methodForApproveVenues(row,showApproveModal),
        methodForRejectVenues: (row,showRejectModal) => methodForRejectVenues(row,showRejectModal),       
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