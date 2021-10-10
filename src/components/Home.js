import React from 'react';
import Nav from "./Nav";
import Image from "./Image";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";


const Home = (props) => {
  axios.defaults.baseURL = "https://my-unsplash-clone-app.herokuapp.com/";

  const [isMouseHovered, setMouseHovered] = useState(false);
  const [activeCard, setActiveCard] = useState("none");
  const [imageToDeleteId, setImageToDeleteId] = useState("");
  const [images, setImages] = useState([]);
  const [distFromTop, setDistanceFromTop] = useState(0);
  const [searchReceived, setSearchReceived] = useState(false);

  const handleMouseIn = () => { setMouseHovered(true); }

  const handleMouseOut = () => { setMouseHovered(false); }

  const showAddCard = () => { setActiveCard("add"); } // show add card

  const showDeleteCard = (yPos, passedId) => {  // show delete card relative to the position at which it was activated
    setImageToDeleteId(passedId);
    setDistanceFromTop(yPos);
    setActiveCard("delete");
  }

  const hideCard = () => { setActiveCard("none"); } // hide card: either 'add' or 'delete'

  const createImage = (image) => {
    return <div className="image-box" key={image._id}>
          <Image id={image._id}
            src={image.img_url} 
            alt={image.label}
            imgLabel={image.label}
            mouseOver= {isMouseHovered}
            handleIn= {handleMouseIn}
            handleOut={handleMouseOut}
            showDeleteCard={showDeleteCard}
          />
    </div>
  };

  useEffect(() =>{  // fetch all images and update state
    async function fetchData() {
      const results = await axios.get("/images/all");
      setImages(results.data);
    };
    
    fetchData();
  }, []);


  useEffect(() => { //  updates searchReceived state to true if props were passed to this component from another route
    if (typeof props.location.state !== "undefined") {
      setSearchReceived(true);
    };  
  }, [props.location.state]);

  const emptyImages = () => { // function to check if there are currently no images
    if ( (images.length < 1) || ( (searchReceived) && (props.location.state.images.length < 1) ) ){
      return true;
    }else{
      return false;
    }
  }
  

  return (
    <div className="container">
      <Nav showCard={showAddCard}/>
      <div className="images-container">
        {emptyImages() ? <div className="empty-images">No images available yet 😑</div>: ""}
        { searchReceived ? props.location.state.images.map(createImage) : images.map(createImage) }
      </div>

      {/* SHOW ADD CARD */}
      {activeCard === "add" && <Card className="card" heading="Add a new photo" 
        label1="Label" inputType1="text" placeholder1="Add photo label e.g Food, Technology, Sports etc"
        showSecondInput={true}
        label2="Photo URL" inputType2="url" placeholder2="https://images.unsplash.com/photo-1632475999234-a1c7f1511c31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
        showDiv={activeCard} closeDiv={hideCard}
        btnTitle="Submit" btnClass="green-btn"
      />}

      {/* SHOW DELETE CARD  */}
      {activeCard === "delete" && <Card className="card" heading="Are you sure?" 
        customStyle={{ top: `${distFromTop}px` }}
        label1="Password" inputType1="password" placeholder1="Password" 
        showSecondInput={false}
        showDiv={activeCard} closeDiv={hideCard}
        btnTitle="Delete" btnClass="red-btn" imageId={imageToDeleteId}
      />}
    </div>
  );
}

export default Home;