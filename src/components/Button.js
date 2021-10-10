import React from 'react';

const Button = (props) => {

    return <button 
    className={props.className} 
    onMouseOver={props.showBtn} 
    onMouseOut={props.hideBtn} 
    style={{display: props.mouseOver ? "block": "none"}}
    onClick={props.action}
    >
        {props.forceDownload ? 
        <a download={props.downloadLoc} href={props.downloadLoc} target={props.target}> {props.content} </a> : 
        <p>{props.content}</p>}
    </button>
}

export default Button;