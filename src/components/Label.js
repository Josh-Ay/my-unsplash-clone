import React from 'react';

const Label = (props) => {
    return <div style={{display: props.mouseOver ? "block": "none"}} className="image-label" onMouseOver={props.showLabel} onMouseOut={props.hideLabel}>
        <p>{props.imgLabel}</p>
    </div>
}

export default Label;