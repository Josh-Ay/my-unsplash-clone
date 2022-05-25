import { toast } from 'react-toastify';

const checkEmptyString = (str) => {    // check that a label was entered
    if (str === "") {
        return toast.error("Please enter a label", {position: "top-center", hideProgressBar: true, pauseOnHover:false, autoClose:4000});
    }

    return false;
}

const checkUrlisValid = (str) => { // check validity of the url entered
    
    try {
        
        let newURL = new URL(str);
        return true;

    } catch (error) {
        return false;
    }

}

const checkPassword = (str) => {   // check password match
    if (str === "password123") {
        return true;
    }

    return false;
}

const emptyImages = (listToCheck) => { // function to check if there are currently no images
    if (listToCheck.length < 1){
      return true;
    }
    
    return false;
};

export {checkEmptyString, checkUrlisValid, checkPassword, emptyImages};