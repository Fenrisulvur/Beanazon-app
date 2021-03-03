import React from 'react'

export default function AboutScreen() {
    return (
        <div className="row top">
            <div className="col-1">
                <h1>Server libraries</h1>
                <ul>
                    <li>NodeJS v12.19.0</li>
                    <li>Express v4.17.1</li>
                    <li>Nodemon v2.0.7</li>
                </ul>
            </div>
            <div className="col-1">
                <h1>Client libraries</h1>
                <ul>
                    <li>react v17.0.1</li>
                    <li>react-redux v7.2.2</li>
                    <li>redux v4.0.5</li>
                    <li>axios v0.21.1</li>
                    <li>react-router-dom v5.2.0</li>
                    <li>link v0.1.5</li>
                    <li>redux-thunk v2.3.0</li>
                </ul>
            </div>
            <div className="col-1">
                <h1>Programmer</h1>
                <ul>
                    <li>Corey Fults</li>
                </ul>
            </div>
        </div>
    )
}
