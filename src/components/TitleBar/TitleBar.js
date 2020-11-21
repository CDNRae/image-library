import React, { Component } from "react";
import {
    BsXCircleFill,
    BsFillPlusCircleFill,
    BsDashCircleFill,
} from "react-icons/bs";

class TitleBar extends Component {
    render() {
        return (
            <div id="title-bar">
                <div id="title-bar-name">Image Library</div>
                <div id="title-bar-button-container">
                    <div id="title-bar-minimize" className="title-bar-button">
                        <BsDashCircleFill />
                    </div>
                    <div id="title-bar-maximize" className="title-bar-button">
                        <BsFillPlusCircleFill />
                    </div>
                    <div id="title-bar-close" className="title-bar-button">
                        <BsXCircleFill />
                    </div>
                </div>
            </div>
        );
    }
}

export default TitleBar;
