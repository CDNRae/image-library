import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { NavItem } from 'react-bootstrap'
import './SideBar.css'

class SideBar extends Component {
  render () {
    return (
            <>
                <Nav className="col-md-12 d-none d-md-block">
                    <div className="sidebar-sticky"></div>
                    <NavItem>
                        <h4>Filter by Tag</h4>
                    </NavItem>
                    <Nav.Item>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Tag name"
                                aria-label="Tag name"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="primary" className="btn-primary-custom">Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Nav.Item>
                    <Nav.Item>
                        TODO: List of active tag filters
                    </Nav.Item>
                </Nav>

            </>
    )
  }
}
export default SideBar
