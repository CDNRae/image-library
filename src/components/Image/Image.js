import React from 'react'
import TagList from '../Tag/Tag'
import Card from 'react-bootstrap/Card'
import './Image.css'

const Image = props => {
  return (
        <div className="image-container">
            <Card className="h-100">
                <Card.Img variant="top" src={props.image.path} />
                {props.showImageName === true &&
                    <Card.Body>

                        <div className="image-name">{props.image.name}</div>

                    </Card.Body>
                }
                <Card.Footer>
                    <ul className="tag-list">
                        {props.image.tags.map(tag => { return <li key={tag.name}><TagList tag={tag}></TagList></li> })}
                    </ul>
                </Card.Footer>
            </Card>
        </div>
  )
}

export default Image
