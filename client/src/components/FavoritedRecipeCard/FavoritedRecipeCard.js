import React from "react";

const FavoritedRecipeCard = props => (
  <div className="card">
    <div className="content">
      <p><strong>Name: </strong> {props.title}</p>
      <p></p>
      <p>
      <a href={props.href}>Website</a></p>
    </div>
  </div>
)

export default FavoritedRecipeCard
