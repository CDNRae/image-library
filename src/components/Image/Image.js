import React from "react";
import TagList from "../Tag/Tag";
import Card from "react-bootstrap/Card";
import "./Image.css";

/**
 * Returns a Bootstrap style Card with an image, image name (if the option is toggled to show image names), and a list of associated tags
 *
 * @param {props} props The props object containing information about the image.
 * @return {JSX} A rendered view of the image.
 */
const Image = (props) => {
    return (
        <div className="image-container">
            <Card className="h-100">
                <Card.Img variant="top" src={props.image.path} />
                {props.showImageName === true && (
                    <Card.Body>
                        <div className="image-name">{props.image.name}</div>
                    </Card.Body>
                )}
                <Card.Footer>
                    <ul className="tag-list">
                        {props.image.tags.map((tag) => {
                            return (
                                <li key={tag.name}>
                                    <TagList tag={tag}></TagList>
                                </li>
                            );
                        })}
                    </ul>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Image;
