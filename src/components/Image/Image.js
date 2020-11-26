import React from "react";
import Card from "react-bootstrap/Card";
import "./Image.css";

/**
 * Returns a Bootstrap style Card with an image, image name (if the option is toggled to show image names), and a list of associated tags
 *
 * @param {props} props The props object containing information about the image.
 * @return {JSX} A rendered view of the image.
 */
const Image = (props) => {
    let image = JSON.parse(props.image);

    return (
        <div className="image-container">
            <Card className="h-100">
                <Card.Img variant="top" src={image.image_path} />
                {props.showImageName === true && (
                    <Card.Body>
                        <div className="image-name">{image.image_name}</div>
                    </Card.Body>
                )}
            </Card>
        </div>
    );
};

export default Image;
