import React from 'react';
import Badge from 'react-bootstrap/Badge';

const TagList = props => {
    return (
        <Badge pill variant="secondary">
            {props.tag}
        </Badge>
    )
}

export default TagList