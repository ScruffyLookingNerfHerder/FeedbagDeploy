import React from "react";

const RecResultButton = props => (

  <button className="rest" id={ props.id }> { props.children } </button>
);

export default RecResultButton;

// <RecResultButton key = {recipe.title}
// id = {recipe.title}
// href = {recipe.source_url}
// ingredients = {recipe.ingredient}
// thumbnail = {recipe.image_url} >
// {
//   RecipeCard(recipecard)
// } </RecResultButton>
