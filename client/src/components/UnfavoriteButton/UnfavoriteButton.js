import React from "react";
import "./UnfavoriteButton.css";

class unfavoriteButton extends React.Component {

  render () {
    return (
      <span className="delete-btn" onClick={this.props.onClick}>
        ✗
      </span>
    );
  }
};



export default unfavoriteButton;
