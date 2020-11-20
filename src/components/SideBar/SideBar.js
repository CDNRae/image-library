import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsChevronDoubleRight, BsX } from 'react-icons/bs';
import { NavItem } from 'react-bootstrap';
import "./SideBar.css"

class SideBar extends Component {
    state = {
        sideBarIsOpen: false
    }

    toggleSideBar() {
        this.setState({ sideBarIsOpen: !this.state.sideBarIsOpen });
    }

    render() {
        return (
            <>
                <div className="open-sidebar">
                    <BsChevronDoubleRight />
                </div>
                <Nav className="col-md-12 d-none d-md-block sidebar">
                    <div className="sidebar-sticky"></div>
                    <NavItem>
                        <div className="close-sidebar">
                            <BsX />
                        </div>
                    </NavItem>
                    <NavItem>
                        <h4>Search by Tag</h4>
                    </NavItem>
                    <Nav.Item>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Tag name"
                                aria-label="Tag name"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="primary">Button</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Nav.Item>
                    <Nav.Item>
                        <h4>Active Tags</h4>
                    </Nav.Item>
                </Nav>

            </>
        );
    }
};
export default SideBar