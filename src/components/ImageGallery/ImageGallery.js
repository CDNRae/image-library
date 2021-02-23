import React, { Component } from "react";
import Image from "../Image/Image";
import UploadImages from "../UploadImages/UploadImages";
import SideBar from "../SideBar/SideBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import "./ImageGallery.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

/** @class ImageGallery represents an image gallery, which displays a series of images in a grid */
class ImageGallery extends Component {
    constructor() {
        super();

        this.state = {
            images: [],
            showSidebar: false,
            imagesUpdated: false,
        };
    }

    componentDidMount() {
        this.getImages();
    }

    getImages = () => {
        ipcRenderer.send("get-images");

        ipcRenderer.on("get-images-reply", (event, arg) => {
            if (arg) {
                let imageList = JSON.parse(arg);
                this.setState({ images: imageList });
            }
        });
    };

    toggleSideBar = () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    };

    renderImage(image, index) {
        return <Image image={image} index={index}></Image>;
    }

    galleryContent() {
        if (this.state.images.length == 0) {
            return (
                <div className="no-images-in-gallery">
                    You have no images in your gallery.
                </div>
            );
        }
        return this.state.images.map((image, index) => {
            return this.renderImage(image, index);
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div
                    id="sidebar"
                    className={`${this.state.showSidebar ? "active" : ""}`}
                >
                    <SideBar />
                </div>
                <div
                    id="content"
                    className={`${this.state.showSidebar ? "active" : ""}`}
                >
                    <div id="toggle-sidebar" onClick={this.toggleSideBar}>
                        <GiHamburgerMenu />
                    </div>
                    <Container fluid>
                        <Row className="top-row">
                            <Col>
                                <h1>Gallery</h1>
                            </Col>
                            <Col>
                                <div className="float-right">
                                    <Button
                                        variant="secondary"
                                        className="btn-secondary-custom"
                                    >
                                        Select Images
                                    </Button>
                                    {"   "}
                                    <UploadImages
                                        getImages={this.getImages.bind(this)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="card-columns">
                                {this.galleryContent()}
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ImageGallery;
