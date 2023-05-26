// Header.js
// import React, { Component } from 'react';

// export default class Header extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       sidebarOpen: false
//     };
//   }

//   toggleSidebar = () => {
//     this.setState({
//       sidebarOpen: !this.state.sidebarOpen
//     });
//   }

//   render() {
//     return (
//       <div className="header">
//         <a className={this.state.sidebarOpen} onClick={this.toggleSidebar} href="#body">Sidebar</a>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react';
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
// import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';


import calllogo from '../assets/Logos/logo_21-02-02.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.currentPage = this.currentPage.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = {
      isMenuOpen: false,
      isModalOpen: true,
      hover: false,
      currentPageIndex: false,
      status: "top"
    };
  }
  componentDidMount() {
    this.listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 1) {
        if (this.state.status !== "scrolled") {
          this.setState({ status: "scrolled" });
        }
      }
      else {
        if (this.state.status !== "top") {
          this.setState({ status: "top" });
        }
      }
    });
  }


  currentPage(page) {
    this.setState({
      currentPageIndex: this.props.locationPathName
    })
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }

  closeMenu() {
    this.setState({
      isMenuOpen: false
    })
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    })
  }

  // If modal is required !
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  //Redirect to the "/fr" route
  handleRedirect(lang) {
    // if (lang = "fr") {
    //   this.props.locationHistory.push('/fr');
    // }
    // else {
    //   this.props.locationHistory.push('/');
    // }
  }

  render() {
    console.log(this.props.locationPathName)
    return (
      <div id="header-main">
        <Navbar fixed='top' bg="light" className={this.state.status === "scrolled" ? "header-color" : "header"} expand="lg">
          <Navbar.Brand href="/">
            <img className="landing-logo" src={calllogo} alt="CANBeWellLogo" test-id="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="icanbewell-navbar-nav" />
          <Navbar.Collapse id="icanbewell-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav class="landing-lang-switch">
            <Nav.Link onClick={this.handleRedirect("en")} className={this.props.locationPathName == "/" ? "" : "font-weight-bold"} >EN</Nav.Link> |
            <Nav.Link onClick={this.handleRedirect("fr")} className={this.props.locationPathName == "/fr" ? "" : "font-weight-bold"}> FR</Nav.Link>
          </Nav>
        </Navbar>
        {/* <Navbar fixed="top" className={this.state.status === "scrolled" ? "header-color" : "header"} expand="lg">
          <NavLink to="/" onClick={this.state.isMenuOpen ? this.toggleMenu : null} className="order-1 col-6 col-md-6 px-3 pl-md-0">
            <img onClick={() => this.setState({ currentPageIndex: false })} className="banner-logo" src={this.state.status === "scrolled" ? "assets/images/Home_Logo.png" : "assets/images/Home_Logo-white.png"} alt="brand-logo.svg" />
          </NavLink>

          <div className="order-4 col-6 col-md-6 d-flex justify-content-end px-0">
            <NavbarToggler onClick={this.toggleMenu}   >
              {this.state.isMenuOpen ?
                <img width="25px" height="16px" src={this.state.status === "scrolled" ? "assets/images/close.png" : "assets/images/close-white.png"} alt="menu" />
                :
                <img src={this.state.status === "scrolled" ? "assets/images/hamburger.png" : "assets/images/hamburger-white.png"} alt="menu" />
              }
            </NavbarToggler>
          </div>

          <Collapse isOpen={this.state.isMenuOpen} navbar className="col-12 col-lg-6 order-5 order-lg-2 justify-content-end p-0">
            <Nav navbar className="collapsed-menu pt-2 pt-sm-4 pt-lg-0">
              {this.props.routers.map((route, index) => {
                return (
                  <NavItem key={index} onClick={window.innerWidth < 992 ? this.closeMenu : null} className="pt-3 pt-md-0" >
                    <NavLink to={route.routeTo} className={this.props.locationPathName === route.routeTo ? "header-link-active" : "header-link"} >
                      <span className={this.state.status === "scrolled" ? "" : "text-white"}>{route.routeName}</span>
                    </NavLink>
                  </NavItem>
                )
              })}
              {(window.innerWidth < 970) &&
                <Row>
                  <Col xs={12} className="mt-4">
                    <div className="d-flex">
                      {this.props.footerDetails.socialIcons.map((social, index) => {
                        return (
                          <React.Fragment key={index}>
                            {this.state.status === "scrolled" ?
                              <social.iconComponent
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="common-header-social"
                              >
                                {social.icon}
                              </social.iconComponent>
                              :
                              <social.iconComponentDark
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="common-header-social"
                              >
                                {social.icon}
                              </social.iconComponentDark>
                            }

                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              }
            </Nav>

          </Collapse>
        </Navbar> */}
      </div>
    );
  }
}


export default Header;
