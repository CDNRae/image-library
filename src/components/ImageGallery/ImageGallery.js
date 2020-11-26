import React, { Component } from "react";
import Image from "../Image/Image";
import UploadImages from "../UploadModal";
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
            showImageName: true,
            showSidebar: false,
        };

        this.getImages = this.getImages();
    }

    getImages() {
        let imageList = ipcRenderer.send("get-images");

        if (imageList) {
            this.setState({ images: JSON.parse(imageList) });
        }
    }

    toggleSideBar = () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    };

    renderImage(image, showImageName) {
        return <Image image={image} showImageName={showImageName}></Image>;
    }

    galleryContent() {
        if (this.state.images == null) {
            return (
                <div className="no-images-in-gallery">
                    You have no images in your gallery.
                </div>
            );
        }
        return this.props.images.map((image) => {
            return (
                <Col
                    key={image.id}
                    lg={4}
                    className="d-flex align-items-stretch"
                >
                    {this.renderImage(image, this.props.showImageName)}
                </Col>
            );
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
                                    <UploadImages getImages={this.getImages} />
                                </div>
                            </Col>
                        </Row>
                        <Row>{this.galleryContent}</Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ImageGallery;
