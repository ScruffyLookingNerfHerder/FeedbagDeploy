import React from "react";
import "./FavRestButton.css"

const FavRestButton = props => (

  <ul className="favlist">
  <li><div className="favrest" href={props.href} id={ props.id } onClick={ props.clickVenueBtn }> <div className="buttonRules">{ props.children }  </div>
  </div>
  </li>
  </ul>

);

export default FavRestButton;
