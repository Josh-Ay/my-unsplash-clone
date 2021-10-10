import React from 'react';
import { useState } from "react";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";
import { useHistory } from "react-router";

const Image = (props) => {
    const [isMouseHovered, setMouseHovered] = useState(false);
    
    const handleIn = () => { setMouseHovered(true); }
    const handleOut = () => { setMouseHovered(false); }

    const history = useHistory();

    const showImage = () => {
        async function fetchData() {
            const results = await axios.get(`/images/image/${props.id}`)
            if (results.status === 200) {
                const imageReceived = results.data;
                history.push({pathname: `/images/image/${imageReceived._id}`, state: {imgSrc: imageReceived.img_url, label: imageReceived.label} });
            }
        };

        fetchData();
        
    }

    const customStyle = {
        filter: isMouseHovered ? "brightness(50%)" : "brightness(100%)",
        cursor : isMouseHovered ? "zoom-in" : "default",
        width : "100%",
        objectFit: "cover",
        background: isMouseHovered ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))": "transparent"
    }

    return <figure style={{position: "relative"}}>
        <img 
            className="image" 
            src={props.src} 
            alt={props.alt} 
            style={customStyle}
            onMouseOver={handleIn} 
            onMouseOut={handleOut}
            onClick={showImage}    
        />
        
        <Label mouseOver={isMouseHovered} showLabel={handleIn} hideLabel={handleOut} imgLabel={props.imgLabel}/>
        <Button className="delete-btn" content="Delete" imageid={props.id} mouseOver={isMouseHovered} showBtn={handleIn} hidebtn={handleOut} action={(e) =>{ props.showDeleteCard(e.pageY - 20, props.id) }}/>
    </figure> 
    
}

export default Image;