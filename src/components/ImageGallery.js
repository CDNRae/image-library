import React, { Component } from 'react';
import Image from './Image';
import UploadImages from './UploadModal';
import SideBar from './SideBar/SideBar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ImageGallery extends Component {
    renderImage(image, showImageName) {
        return (
            <Image image={image} showImageName={showImageName}></Image>
        )
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={3} id="sidebar-wrapper">
                        <SideBar />
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        <Row className="top-row">
                            <Col>
                                <h1>Gallery</h1>
                            </Col>
                            <Col><div className="float-right"><UploadImages /></div></Col>
                        </Row>
                        <Row>
                            {this.props.images.map(image => { return <Col key={image.id} md={4}>{this.renderImage(image, this.props.showImageName)}</Col> })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default ImageGallery