import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';


class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {text:null,
                  toBeDisp:'', 
                  global: 'Global DCR to project',
                  choreo:'Public Projection', 
                  r1:'Florist Projection',
                  r2:'Driver Projection',
                  r3:'Customer Projection'
                };
  }

  render(){

    return <div>
                 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/">DCR Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/public">Public Projection</Nav.Link>
                    <NavDropdown title="Role Projections" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/florist">{this.state.r1}</NavDropdown.Item>
                      <NavDropdown.Item href="/driver">{this.state.r2}</NavDropdown.Item>
                      <NavDropdown.Item href="/customer">{this.state.r3}</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>

                  <Nav >
                  <NavDropdown title="Constraints Legend" id="collasible-nav-dropdown">
                      <NavDropdown.Item style={{"fontSize":'16px'}}>Post-execution</NavDropdown.Item>
                      <NavDropdown.Item style={{color:"#29A81A", "fontSize":'12px'}}> -- Include</NavDropdown.Item>
                      <NavDropdown.Item style={{color:"#FF0000", "fontSize":'12px'}}> -- Exclude</NavDropdown.Item>
                      <NavDropdown.Item style={{color:"#1E90FF", "fontSize":'12px'}}> -- Response</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item style={{"fontSize":'16px'}}>Pre-execution</NavDropdown.Item>
                      <NavDropdown.Item style={{color:"#FFA500", "fontSize":'12px'}}> -- Condition</NavDropdown.Item>
                      <NavDropdown.Item style={{color:"#BC1AF2", "fontSize":'12px'}}> -- Milestone</NavDropdown.Item>
                    </NavDropdown>

                  </Nav>
                </Navbar.Collapse>
              </Navbar>

          </div>
;
  }
}

export default Header

