import React, { Component } from "react";
import { withUser } from '../../services/withUser';
import axios from "axios";
import AuthFailedPage from "../AuthFailedPage";
import SiteNav from "../../components/SiteNav";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import "./RecipePage.css";

class Userpage extends Component {

constructor(props){
  super(props);
}

state = {
  Recipe: {}
}

componentDidMount() {
// only try loading Recipe if the user is logged in.
if (!this.props.user) {
      return;
    }
      console.log(this.props.user);
      let recipe = {}
        API.getRecipe(this.props.user.id, this.props.match.params.id)
          .then(res => {
            this.setState({Recipe: res.data})
            recipe = res.data

            API.getIngredients(this.state.Recipe.id)
            .then(res => {
              recipe.ingredients = res.data.ingredients
              this.setState({Recipe: recipe})
              API.updateRecipe(this.props.user.id, this.props.match.params.id, this.state.Recipe)
            }).catch(err => console.log(err))
            API.getSteps(this.state.Recipe.publisher, this.state.Recipe.source_url)
            .then(res => {
              recipe.steps = res.data.steps
              this.setState({Recipe: recipe})
              API.updateRecipe(this.props.user.id, this.props.match.params.id, this.state.Recipe)
              .then(res => {
                console.log(res.data)
              })
              console.log(this.state.Recipe)
            }).catch(err => console.log(err))

          }).catch(err => console.log(err))
    }

getIngredients = (id) => {
  API.getIngredients(id)
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err)
    });
}

getSteps = (publisher, url) => {
  API.getSteps(publisher, url)
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err)
    });
}

renderarrays =(array) => {
  let display = array.map(element => (
    <li>{element}</li>
  ))
  return display;
}


render() {
    const { user } = this.props; // get the user prop from props
    console.log(this.state.Recipe)

    return (
      <div className = "container">
        <Jumbotron />
        <SiteNav />

      <div className = "recipe">
        <img className= "recipeimg" src= {this.state.Recipe.image}></img>
      <p className = "specificrecipeheaders">{this.state.Recipe.title}</p>
      <img className="chalkpic" src="/images/chalk-border.png"></img>
      <div className = "ingredientsandsteps">
        <p className= "specificrecipeheaders"> Ingredients </p>
        {this.state.Recipe.ingredients ? (
          <ol>
            {this.renderarrays(this.state.Recipe.ingredients)}
          </ol>
        ) : (
          <h3> Please wait while we retrieve the recipe ingredients</h3>
        )}

        <p className="specificrecipeheaders"> Steps </p>
        {this.state.Recipe.steps ? (
          <ul>
            {this.renderarrays(this.state.Recipe.steps)}
          </ul>
        ) : (
            <h3> Please wait while we retrieve the recipe steps</h3>

        )}

      </div>
      <div className="back">
        <span>
      <a href="/recipes"> Click here to go back to your favorite recipes!</a>
      </span>
      </div>
      </div>




      </div>
    )
  }
}

export default Userpage;
