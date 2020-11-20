import React from 'react';
import TagList from './Taglist';
import Card from 'react-bootstrap/Card';

const Image = props => {
    return (
        <div className="image-container">
            <Card>
                <Card.Img variant="top" src={props.image.path} />
                <Card.Body>
                    {props.showImageName === true &&
                        <div className="image-name">{props.image.name}</div>
                    }
                    <ul className="tag-list">
                        {props.image.tags.map(tag => { return <li key={tag.name}><TagList tag={tag}></TagList></li> })}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Image;