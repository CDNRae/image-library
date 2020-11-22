import React, { Component } from "react";
import {
    BsXCircleFill,
    BsPlusCircleFill,
    BsDashCircleFill,
} from "react-icons/bs";
import "./TitleBar.css";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class TitleBar extends Component {
    handleMinimizeApplication = () => {
        ipcRenderer.send("minimize");
    };

    handleMaximizeApplication = () => {
        ipcRenderer.send("maximize");
    };

    handleCloseApplication = () => {
        ipcRenderer.send("close");
    };

    render() {
        return (
            <div id="title-bar">
                <div id="title-bar-name">Image Library</div>
                <div id="title-bar-button-container">
                    <div
                        id="title-bar-minimize"
                        className="title-bar-button"
                        onClick={this.handleMinimizeApplication}
                    >
                        <BsDashCircleFill />
                    </div>
                    <div
                        id="title-bar-maximize"
                        className="title-bar-button"
                        onClick={this.handleMaximizeApplication}
                    >
                        <BsPlusCircleFill />
                    </div>
                    <div
                        id="title-bar-close"
                        className="title-bar-button"
                        onClick={this.handleCloseApplication}
                    >
                        <BsXCircleFill />
                    </div>
                </div>
            </div>
        );
    }
}

export default TitleBar;
