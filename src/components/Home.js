import React from 'react';
import Nav from "./Nav";
import Image from "./Image";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { emptyImages } from '../validators/validator';


const Home = (props) => {
  axios.defaults.baseURL = "https://fierce-ruby-beaver.cyclic.app/";

  const [isMouseHovered, setMouseHovered] = useState(false);
  const [activeCard, setActiveCard] = useState("none");
  const [imageToDeleteId, setImageToDeleteId] = useState("");
  const [images, setImages] = useState([]);
  const [distFromTop, setDistanceFromTop] = useState(0);
  const [imagesLoading, setImagesLoading] = useState(true);
  
  const inputReceived = useState(false);
  const setInputReceived = inputReceived[1];

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

  useEffect(() => { //  updates searchReceived state to true if props were passed to this component from another route and update images rendered
    if (typeof props.location.state !== "undefined") {
      setInputReceived(true);
      setImages(props.location.state.images);
    };  
  }, [setInputReceived, props.location.state]);
  

  useEffect(() =>{  // fetch all images and update state
    async function fetchData() {
      await axios.get("/images/all")
      .then((response)=>{
        if (response.status === 200) {
          setImages(response.data);
          setImagesLoading(false);
        }
      })
      .catch((err)=>{ console.log(err.response); setImagesLoading(false); });
    };
    
    fetchData();
  }, []);


  return (
    <div className="container">
      <Nav showCard={showAddCard}/>
      <div className="images-container">
        {imagesLoading ? <div className="empty-images">Please wait...</div> : emptyImages(images) ? <div className="empty-images">No images available yet 😑</div> : images.map(createImage) }
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
