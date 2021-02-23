import React, { Component } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class UploadImages extends Component {
    state = {
        images: [],
        show: false,
    };

    handleClose = () => {
        this.setState({
            images: [],
            show: false,
        });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleDrop = (images) => {
        let imageList = this.state.images;

        for (var i = 0; i < images.length; i++) {
            if (images[i]) {
                imageList.push({ name: images[i].name, path: images[i].path });
            }
        }

        this.setState({ images: imageList });
        console.log(this.state.images);
    };

    handleUpload = () => {
        if (this.state.images.length > 0) {
            ipcRenderer.send(
                "insert-images",
                JSON.stringify(this.state.images)
            );

            ipcRenderer.on("insert-images-reply", (event, arg) => {
                console.log(arg);
                let response = JSON.parse(arg);

                if (response.status == "success") {
                    this.props.getImages();
                } else {
                    console.error(response.message);
                }
                this.handleClose();
            });
        }
    };

    render() {
        return (
            <>
                <Button
                    variant="primary"
                    onClick={this.handleShow}
                    className="btn-primary-custom"
                >
                    Upload Images
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DragAndDrop handleDrop={this.handleDrop}>
                            <div style={{ height: 300, width: 250 }}>
                                {this.state.images.map((image, index) => (
                                    <div key={index}>{image.name}</div>
                                ))}
                            </div>
                        </DragAndDrop>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleUpload}>
                            Upload Images
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default UploadImages;
