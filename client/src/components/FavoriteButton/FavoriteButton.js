import React from "react";
import { Link } from "react-router-dom";
import "./FavoriteButton.css";



class FavoriteButton extends React.Component {

  render () {
    return (
      <button className="favorite-btn btn btn-sm d-inline" onClick={this.props.onClick}>
        Favorite
      </button>
    );
  }


};

export default FavoriteButton;
