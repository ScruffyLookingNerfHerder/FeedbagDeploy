import React, { Component } from "react";
import { withUser } from '../../services/withUser';
import axios from "axios";
import AuthFailedPage from "../AuthFailedPage";
import SiteNav from "../../components/SiteNav";
import Jumbotron from "../../components/Jumbotron";
import ResultButton from "../../components/ResultButton"
import FavoritedRecipeCard from "../../components/FavoritedRecipeCard"
import Wrapper from "../../components/Wrapper"
import API from "../../utils/API"
import "./RecipesPage.css"

class Userpage extends Component {

state = {
  recipes: []
}

componentDidMount() {
// only try loading stuff if the user is logged in.
if (!this.props.user) {
      return;
    }
      console.log(this.props.user)
        API.getRecipes(this.props.user.id)
          .then(res => {
            this.setState({recipes: res.data})
            console.log(res.data);
          }).catch(err => {
            console.log(err);
          })
    }

renderCards = () => {
  let renderCards = this.state.recipes.map(recipe => (
    <a href= {`/recipes/${this.props.user.id}/${recipe._id}`}>
      <ResultButton
        key = {recipe.id}
        id = {recipe.id}
        >
        {FavoritedRecipeCard(recipe)}
      < /ResultButton>
    </a>
  ))
  return renderCards
}

render() {
    const { user } = this.props; // get the user prop from props


    return (
      <Wrapper>
      <div className = "container">
        <Jumbotron />
        <SiteNav />
        <div className = "recipeboard">
          <h1> {this.props.user.username}'s Recipes!</h1>
        {this.renderCards()}
      </div>
      </div>
      </Wrapper>
    )
  }
}

export default Userpage;
