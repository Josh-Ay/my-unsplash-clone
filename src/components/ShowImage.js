import React from 'react';
import Button from "./Button";
import CloseIcon from '@material-ui/icons/Close';
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { useState } from "react";

const ShowImage = (props) => {
    const history = useHistory();
    const [activeImage, setActiveImage] = useState(true);

    const isMobileDevice = useMediaQuery({query: "(max-width: 767px)"});
    
    const routeToHome = () => {history.push("/")};

    const expandImage = (e) =>{
        const image = e.target;
        
        if (activeImage) {
            image.classList.add("zoom-in");    
        }else{
            image.classList.remove("zoom-in");
        }

        setActiveImage( !activeImage );
    };

    return <div className="show-image" style={ {position: "relative"} }>
        {isMobileDevice && <div className="icons-container-small"> <CloseIcon className="close-icon-small" onClick={routeToHome} /> </div>}
        
        <div className="icons-container">
            <CloseIcon className="close-icon" onClick={routeToHome} />
            <Button className="download-btn green-btn" mouseOver={true} forceDownload={true} content="Download" 
            downloadLoc={props.location.state.imgSrc} target="_blank" />
        </div>

        <div className="image-card">
            <figure>
                <img src={props.location.state.imgSrc} 
                alt={props.location.state.label} onClick={expandImage}/>
            </figure>
        </div>
    </div>   
};

export default ShowImage