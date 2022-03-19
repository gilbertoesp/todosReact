import React from "react";
import './TodoIcon.css'
import { DiReact, DiJoomla } from 'react-icons/di'

const iconTypes = {
    "check": color => (
        <DiReact className="Icon-svg Icon-svg--check" fill={color} />
    ),
    "delete": color => (
        <DiJoomla className="Icon-svg Icon-svg--delete" fill={color} />
    )
}

function TodoIcon ({type, color, onClick}) {
    return (
        <span
            className={`Icon-container Icon-container--${type}`}
            onClick={onClick}
        >
            {iconTypes[type](color)}
        </span>
    );
}

export { TodoIcon };