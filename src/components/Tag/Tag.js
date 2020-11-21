import React from 'react'
import Badge from 'react-bootstrap/Badge'
import './Tag.css'

const Tag = props => {
  return (
        <Badge pill variant="secondary" className="custom-tag-pill">
            {props.tag}
        </Badge>
  )
}

export default Tag
