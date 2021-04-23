import React from 'react';

export default function StackItem(props) {

    return (
        <div className={`stack_item ${props.isActive?"selected_item":""}`}
             onClick={()=> props.setActiveIndexProps(props.index)}>
            <p>{props.text}</p>
            <img alt={props.text} src={props.logo}/>
        </div>
    );
}