import React, { Component, useState } from 'react';
import DragAndDrop from './DragAndDrop';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UploadImages extends Component {
    state = {
        files: [],
        show: false
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }

    handleDrop(files) {
        let fileList = this.state.files;

        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({ files: fileList })
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow} className="btn-primary-custom">
                    Upload Images
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DragAndDrop handleDrop={this.handleDrop}>
                            <div style={{ height: 300, width: 250 }}>
                                {this.state.files.map((file) =>
                                    <div>{file}</div>
                                )}
                            </div>
                        </DragAndDrop>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
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