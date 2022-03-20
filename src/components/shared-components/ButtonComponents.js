import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faCircleCheck ,faBan} from '@fortawesome/free-solid-svg-icons'

const VenueButtons = () => {
    const favoriteImage = () =>{
        alert('Selected Image has been favorited')
    }  
    return (
        <>
        <span className="mx-3" title="Approve Venue" onClick={favoriteImage}><FontAwesomeIcon icon={faEye}/></span>
            <span className="mx-3" title="Reject Venue" onClick={favoriteImage}><FontAwesomeIcon icon={faCircleCheck}/></span>
            <span className="mx-3" title="View Venue Details" onClick={favoriteImage}><FontAwesomeIcon icon={faBan}/></span>
        </>
    );
};

// const RejectButton = (props) => {
//     const DownloadImage = () =>{
//         let imageLink = props.value
//         window.open(imageLink,'_blank')
//     }
    
//     return (      
//          <><button>Reject</button></>     
//     );
// };

export {VenueButtons}