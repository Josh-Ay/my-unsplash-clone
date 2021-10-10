import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Search = () => {
    const [inputText, setInputText] = useState("");
    const history = useHistory();
    // 1. get list of available labels
    // 2. when one in list is clicked, return the display of all the ones that matched in DB 
    
    const handleChange = (e) => { setInputText(e.target.value); }

    const searchImage = (e) => {
        async function fetchImages(queryStr){
            const result = await axios.get(`/images/s/image/${queryStr}`);
            if (result.status === 200){
                history.push({pathname: "/", state: {images: result.data } });
            };
        };

        if ((e.key === "Enter") && (inputText.length > 0) ){
            const formattedInputText = inputText[0].toUpperCase() + inputText.slice(1, inputText.length).toLowerCase();
            fetchImages(formattedInputText);
        }else if( (e.target.classList.contains("search-icon") || e.target.parentNode.classList.contains("search-icon")) && inputText.length !== 0 ){
            const formattedInputText = inputText[0].toUpperCase() + inputText.slice(1, inputText.length).toLowerCase();
            fetchImages(formattedInputText);
        };

    };

    return <div className="search-box-container">
        <div className="search-box">
            <SearchIcon className="search-icon" onClick={searchImage} />
            <input type="text" placeholder="Search by name" onChange={handleChange} value={inputText} onKeyDown={searchImage}></input>
        </div>
    </div>
}

export default Search;