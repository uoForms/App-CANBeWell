import React from 'react';
import PropTypes from 'prop-types';

class TopicsModal extends React.Component {

  render() {

    // Render info about the user
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const myModalStyle = {
      backgroundColor: '#fff',
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      textAlign:'center',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="myModal" style={myModalStyle}>

          <div className="footer">
            <h1>{this.props.header}</h1>
            <p>{this.props.body}</p>
            <div>
              <button onClick={this.props.onClose}>{this.props.button}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopicsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  header: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.string,
  displayConfig: PropTypes.bool
};

export default TopicsModal;
