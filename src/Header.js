// Header.js
import React, {Component} from 'react';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
  }

  toggleSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

    render(){
        return (
          <div className="header">
            <a className={this.state.sidebarOpen} onClick={this.toggleSidebar} href="#body">Sidebar</a>
          </div>
        )
    }
}
