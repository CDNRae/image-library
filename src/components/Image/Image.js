import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { BsArrowsAngleExpand } from "react-icons/bs";
import "./Image.css";

/**
 * Returns a Bootstrap style Card with an image, image name (if the option is toggled to show image names), and a list of associated tags
 *
 * @param {props} props The props object containing information about the image.
 * @return {JSX} A rendered view of the image.
 */
const Image = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card>
                <div className="card-image-container">
                    <Card.Img variant="top" src={props.image.image_path} />
                    <div className="card-image-information">
                        <div
                            className="image-expand-button"
                            onClick={handleShow}
                        >
                            <BsArrowsAngleExpand />
                        </div>
                        <div className="image-name">
                            {props.image.image_name}
                        </div>
                    </div>
                </div>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="fullsize-image-modal"
            >
                <Modal.Body>
                    <img
                        className="fullsize-image"
                        src={props.image.image_path}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Image;
