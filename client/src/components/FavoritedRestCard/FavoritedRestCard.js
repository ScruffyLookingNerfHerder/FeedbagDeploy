import React from "react";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";



const FavoritedRestCard = props => (
  <div className="card">
    <div className="content">
    
      <p><strong> {props.name} </strong></p>
      <p>Address: {props.address}</p>
      <p>
      <a href={props.websiteURL}>Website</a></p>
    </div>
  </div>
)

export default FavoritedRestCard
