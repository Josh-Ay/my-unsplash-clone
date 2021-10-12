import { toast } from 'react-toastify';
import validUrl from 'valid-url';

const checkEmptyString = (str) => {    // check that a label was entered
    if (str === "") {
        return toast.error("Please enter a label", {position: "top-center", hideProgressBar: true, pauseOnHover:false, autoClose:4000});
    } else {
        return false;
    }
}

const checkUrlisValid = (str) => { // check validity of the url entered
    if (validUrl.isUri(str)){
        const image_url = new Image();  // creating a new image object to verify that the url is an actual image
        image_url.src = str;
        if (image_url.width > 0){
            return true;
        }else{
            return false;
        };
    }else{
        return false;
    }
}

const checkPassword = (str) => {   // check password match
    if (str === "password123") {
        return true;
    } else {
        return false;
    }
}

const emptyImages = (listToCheck) => { // function to check if there are currently no images
    if (listToCheck.length < 1){
      return true;
    }else{
      return false;
    }
};

export {checkEmptyString, checkUrlisValid, checkPassword, emptyImages};