import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkEmptyString, checkUrlisValid, checkPassword} from '../validators/validator';
import { useHistory } from "react-router";

const Card = (props) => {
    const history = useHistory();
    const routeToHome = () => { history.go("/"); }    // redirect back to homepage.

    const [inputText, setInputText] = useState({firstInput: "", secondInput: "" });

    const ref = useRef(null);

    const updateText = (e) => { // update input text
        const {name, value} = e.target;
        setInputText(prevValue=>{
            return{ ...prevValue, [name]: value }
        });
    };
        
    const postContent = (routeToPostTo, contentToPost) => {    // to post content using axios
        axios.post(routeToPostTo, qs.stringify(contentToPost))
        .then((response)=>{
            if (response.status === 200){
                routeToHome();
            }
        })
        .catch((err)=>{console.log(err.response)});
    };

    const validateContent = (contentType) => { // function to validate the content that's inputted before it's posted
        
        if (contentType === "newContent") { // add a new image
            if (!(checkEmptyString(inputText.firstInput)) && (checkUrlisValid(inputText.secondInput))){
                postContent("/add", inputText);
            }else{
                toast.error("Please enter a valid URL", {position: "top-center", hideProgressBar: true, pauseOnHover:false, autoClose:3000})
            };
        } else if (contentType === "deleteContent") {   // delete an image
            if (checkPassword(inputText.firstInput)){
                postContent("/delete", {id: props.imageId});
            }else{
                toast.error("Password is: password123", {position: "top-center", hideProgressBar: true, pauseOnHover:false, autoClose:3000})
            };
        }
        
    };

    const performAction = (e) => {  // validate content before posting
        if(e.target.closest("button").classList.contains("green-btn")){   // green button: for adding new images
            validateContent("newContent");
        }else{  // for deleting an image
            validateContent("deleteContent");
        };
    };

    useEffect(() => {   // adding an eventlistener to detect clicks
        document.addEventListener('click', closeCard, true);
        return () => {
            document.removeEventListener('click', closeCard, true);
        };
    });

    const closeCard = (e) => {  // close this component
        if ( (e.key === "Escape") || ( ref.current && !ref.current.contains(e.target) ) ) {
            props.closeDiv();   
        };
    };

    return <div className={props.className} style={props.customStyle} onKeyDown={closeCard} ref={ref}>
        <h1>{props.heading}</h1>
        <ToastContainer className="error-message" autoClose={false} position="top-center" closeButton={false} />
        <label>
            {props.label1}
            <input type={props.inputType1} name="firstInput" placeholder={props.placeholder1} required={true} value={inputText.firstInput} onChange={updateText} />
        </label>
        
        <label style={{display: props.showSecondInput ? "block" : "none"}}>
            {props.label2}
            <input style={{display: props.showSecondInput ? "block" : "none"}} type={props.inputType2} name="secondInput" placeholder={props.placeholder2} required={true} value={inputText.secondInput} onChange={updateText}/>
        </label>
        <div className="btns-container">
            <Button className="cancel-btn" mouseOver={true} content="Cancel" action={props.closeDiv}/>
            <Button className={props.btnClass + " submit-btn"} mouseOver={true} content={props.btnTitle} action={performAction}/>
        </div>
    </div>
};

export default Card;