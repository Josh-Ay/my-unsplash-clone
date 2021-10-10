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

  const showAddCard = () => { setActiveCard("add"); }

  const showDeleteCard = (yPos, passedId) => {
    setImageToDeleteId(passedId);
    setDistanceFromTop(yPos);
    setActiveCard("delete");
  }

  const hideCard = () => { setActiveCard("none"); }

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

  useEffect(() =>{
    async function fetchData() {
      const results = await axios.get("/images/all");
      setImages(results.data);
    };
    
    fetchData();
  }, []);


  useEffect(() => {
    if (typeof props.location.state !== "undefined") {
      setSearchReceived(true);
    };  
  }, [props.location.state]);

  const emptyImages = () => {
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

      {activeCard === "add" && <Card className="card" heading="Add a new photo" 
        label1="Label" inputType1="text" placeholder1="Add photo label e.g Food, Technology, Sports etc"
        showSecondInput={true}
        label2="Photo URL" inputType2="url" placeholder2="https://images.unsplash.com/photo-1632475999234-a1c7f1511c31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
        showDiv={activeCard} closeDiv={hideCard}
        btnTitle="Submit" btnClass="green-btn"
      />}

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