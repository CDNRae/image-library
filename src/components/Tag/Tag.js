import React from "react";
import Badge from "react-bootstrap/Badge";
import "./Tag.css";

/**
 * Returns a Bootstrap style pill with the name of a tag inside
 *
 * @param {props} props The props object containing information about the tag.
 * @return {JSX} A rendered view of the tag.
 */
const Tag = (props) => {
    return (
        <Badge pill variant="secondary" className="custom-tag-pill">
            {props.tag}
        </Badge>
    );
};

export default Tag;
