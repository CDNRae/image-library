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

/** @class ImageGallery represents an image gallery, which displays a series of images in a grid */
class ImageGallery extends Component {
    state = {
        showSidebar: false,
    };

    toggleSideBar = () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    };

    renderImage(image, showImageName) {
        return <Image image={image} showImageName={showImageName}></Image>;
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
                                    <UploadImages />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {this.props.images.map((image) => {
                                return (
                                    <Col
                                        key={image.id}
                                        lg={4}
                                        className="d-flex align-items-stretch"
                                    >
                                        {this.renderImage(
                                            image,
                                            this.props.showImageName
                                        )}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ImageGallery;
