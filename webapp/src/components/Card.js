import React from 'react';

export default (props) => {
    const bgClass = props.polarity >= 0.25 ? 'success' : props.polarity <=-0.25 ? 'danger' : 'primary';
    return (
        <div className={`card text-white bg-${bgClass}`} style={{width: 'auto', marginTop: 15, marginBottom: 15}} key={props.key}>
            <div className="card-header">{props.author}</div>
            <div className="card-body">
                <p className="card-text">{props.tweet}</p>
            </div>
        </div>
    )
}