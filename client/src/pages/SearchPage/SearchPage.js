// import "../../App.css";
import React, {Component} from "react";
import API from "../../utils/API"
import Wrapper from "../../components/Wrapper";
import RestCard from "../../components/RestCard";
import VenCard from "../../components/VenCard";
import ResultButton from "../../components/ResultButton";
import VenResultButton from "../../components/VenResultButton";
import RecipeCard from "../../components/RecipeCard";
import RecResultButton from "../../components/RecResultButton";
import {Link} from 'react-router-dom';
import {withUser} from '../../services/withUser';
import axios from "axios";

import 'rc-checkbox/assets/index.css';
import Checkbox from "rc-checkbox";
import searchOps from "./searchOps.json";
import SiteNav from "../../components/SiteNav";
import Jumbotron from "../../components/Jumbotron";
import "./SearchPage.css";
import FavoriteButton from "../../components/FavoriteButton";
import UnfavoriteButton from "../../components/UnfavoriteButton";



class SearchPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // only try loading stuff if the user is logged in.
    if (!this.props.user) {
      return;
    }
    // console.log(this.props.user);
    // axios.get('/api/Restaurants/' + this.props.user.id)
    //   .then(res => {
    //
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // axios.get('/api/RecipeEXP/' + "schnitzel")
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }


  state = {
    venues: [],
    recipes: [],
    isCuisineSelected: null,
    searchOps,
    singleVen: undefined,
    showRestInfo: true,
    loSearch: "arlington va",
    // resRecSearch: null,
    restSearch: [],
    recSearch: [],
    restResultsFound: 0,
    recResultsFound: 0
  }
  // =====================================

  onChange = e => {
    console.log('Checkbox :', (e.target));
  }

  restConCat = (array) => {
    return array.join(',');
  }

  recConCat = (array) => {
    return array.join('&');
  }

  handleInputChange = event => {
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCuisineSel = event => {

    const eValue = event.target.value;
    const eId = event.target.id;

    let restSearchArr = this.state.restSearch;
    let recSearchArr = this.state.recSearch;
    let removeRestSearchTerm = restSearchArr.filter(restSearchTerm => restSearchTerm !== eValue);
    let removeRecSearchTerm = recSearchArr.filter(recSearchTerm => recSearchTerm != eId);

    if (event.target.checked === true) {
      console.log("set to true")
      restSearchArr.push(eValue);
      recSearchArr.push(eId);
      this.setState({
        restSearch: restSearchArr
      })
      this.setState({
        recSearch: recSearchArr
      })
      console.log(this.state.restSearch)

    } else {
      console.log("set to false")
      this.setState({
        restSearch: removeRestSearchTerm
      })
      this.setState({
        recSearch: removeRecSearchTerm
      })
    }
  }

  handleTruVenRecCard = event => {
    if (this.state.showRestInfo === true) {
      this.setState({
        showRestInfo: false
      })
    } else if (this.state.showRestInfo === false && this.state.singleVen !== undefined) {
      this.setState({
        showRestInfo: false
      })
    }
  }

  // ===================

  submitRecAndRestApi = event => {

    let restSearch = this.state.restSearch;
    let loSearch = this.state.loSearch;

    if (loSearch === undefined || null) {
      this.setState({ loSearch: "Enter a Location!" })
    }

    if (restSearch.length === 0) {
      this.setState({ isCuisineSelected: "Select a Cuisine!"})
    }

    else if (restSearch.length > 0) {
      let joinedRestS = this.restConCat(this.state.restSearch);
      // this.setState({ resRecSearch: joinedRestS})
      // console.log(joinedRestS)
      event.preventDefault();

      API.getRest(this.state.loSearch, joinedRestS)
        .then(res => {
          console.log(res.data.response.venues)
          this.setState({
            venues: res.data.response.venues
          })
          this.setState({
            restResultsFound: this.state.venues.length
          })
          console.log(this.state.restResultsFound)
        })
        .catch(err => console.log(err));

      // if (this.state.restResultsFound == 0) {
      //   this.setState({ restResultsFound: "0 venues found!"})
      // }
      this.setState({ isCuisineSelected: null })
      this.setState({
        singleVen: undefined
      })
      this.loadRecipes();
      joinedRestS = "";
    }
  }

  loadRecipes = () => {

    let joinedRecS = this.recConCat(this.state.recSearch)

    API.getRec(joinedRecS)
      .then(res => {
        console.log(res.data.recipes)
        const canscrape = ["All Recipes", "Closet Cooking", "101 Cookbooks", "BBC Good Food", "The Pioneer Woman", "Bon Appetit", "Jamie Oliver", "BBC Food", "Epicurious", "Tasty Kitchen", "Cookstr", "Simply Recipes"]
        const filteredrecs = res.data.recipes.filter(recipe => canscrape.includes(recipe.publisher))

        this.setState({
          recipes: filteredrecs
        })

        this.setState({
          recResultsFound: this.state.recipes.length
        })
      })
      .catch(err => console.log(err));

    joinedRecS = "";
  }

  loadSingleVenue = event => {
    let id = event.currentTarget.id;
    event.persist();
    event.preventDefault();
    this.handleTruVenRecCard();
    API.getVenue(id)
      .then(res => {
        const venue = res.data.response.venue
        venue.isSaved = false
        console.log(venue)
        this.setState({
          singleVen: venue
        })
      })
      .catch(err => console.log(err));
}

removefromstate = (array, element) => {
  console.log(element)

  switch (array) {
    case this.state.venues:
      let newvenuestate = array.filter(e => e.id !== element)
      return newvenuestate;
    case this.state.recipes:
      let newrecipestate = array.filter(e => e.recipe_id !== element)
      return newrecipestate;
    default:
      break;
  }


}

//Saves a restaurant to the database, then reloads restaurants from the db
   saveRestaurant = (id, venue) => {
     // Makes a clone of the current state by using the spread method on this.state

     const user = this.props.user.id
     const savedvenue = this.state.venues.filter(venue => venue.id === id);
     const newvenues = this.removefromstate(this.state.venues, id);
     console.log(newvenues)


     const savedRestaurant = {
       name: venue.name,
       websiteURL: venue.url,
       address: venue.location.address,
       city: venue.location.city,
       country: venue.location.cc,
       state: venue.location.state,
       phone: venue.phone.formattedPhone,
       photos: venue.img,
       lat: venue.location.lat,
       lng: venue.location.lng,
       User: user
     }
     console.log(venue)
     console.log(savedRestaurant)
     API.saveRestaurant(this.props.user.id, savedRestaurant)
       .then(res => {

         this.setState({
           venues: newvenues
         });
         console.log(this.state.venues)
         this.renderRestCard()
       })
       .catch(err => console.log(err));
   };

   saveRecipe = (id, recipe) => {
     console.log(id)
     const user = this.props.user.id
     const newrecipes = this.removefromstate(this.state.recipes, id);
     const savedRecipe = {
       publisher: recipe.publisher,
       f2f_url: recipe.f2f_url,
       title: recipe.title,
       source_url: recipe.source_url,
       id: recipe.recipe_id,
       image: recipe.image_url,
       User: user
     }
     API.saveRecipe(user, savedRecipe)
     .then(res => {
       this.setState({
         recipes: newrecipes
       });
       this.renderRecCards()
     })
   }

// =======================
renderRestCard = () => {
  let renderRestCard = this.state.venues.map(restaurant => (
    <ResultButton
      key = {restaurant.id}
      id = {restaurant.id}
      clicked = {this.showRestInfo}
      clickVenueBtn = {this.loadSingleVenue}
      clickHandleTru = {this.handleTruVenRecCard} >
    {RestCard(restaurant)}
    < /ResultButton>
  ))
  return renderRestCard;
}

renderVenCard = () => {
  if (this.state.singleVen !== undefined) {

    let singleVenObj = this.state.singleVen;
    let renderVenObj;

    if (this.state.singleVen.photos.groups[0] !== undefined) {
      let imgPre = "https://igx.4sqi.net/img/general/width960"
      let imgSuf = this.state.singleVen.photos.groups[0].items[0].suffix;
      renderVenObj = {
        key: singleVenObj.id,
        id: singleVenObj.id,
        name: singleVenObj.name,
        price: singleVenObj.price,
        hours: singleVenObj.hours,
        location: singleVenObj.location,
        phone: singleVenObj.contact,
        url: singleVenObj.url,
        type: singleVenObj.categories,
        img: imgPre + imgSuf,

      }
    } else {
      renderVenObj = {
        key: singleVenObj.id,
        id: singleVenObj.id,
        name: singleVenObj.name,
        price: singleVenObj.price,
        hours: singleVenObj.hours,
        location: singleVenObj.location,
        phone: singleVenObj.contact,
        url: singleVenObj.url,
        type: singleVenObj.categories,

      }
    }
    return (
      <div className= "VenCardParent">
        <FavoriteButton onClick={() => this.saveRestaurant(renderVenObj.id, renderVenObj)} />
      {VenCard(renderVenObj)}
      </div>
    )
  }
}


renderRecCards = () => {
  let recipecard = {}
  let renderRestCard = this.state.recipes.map(recipe => (

    <ul>
      <li>
    <div className="RecipeResults">

    <RecResultButton key = {recipe.title}

    id = {recipe.title}
    href = {recipe.source_url}
    ingredients = {recipe.ingredient}
    thumbnail = {recipe.image_url} >
    {
      RecipeCard(recipe)
    }
    <FavoriteButton onClick={()=> this.saveRecipe(recipe.recipe_id, recipe)}></FavoriteButton>
    </RecResultButton>
  </div>
    </li>
  </ul>
  ))
  return renderRestCard;
}

renderCuisOp = () => {
  let renderSurvey = this.state.searchOps.map(checkbox => (
    <button className = "rest cuisinelists" >
    <Checkbox key = {checkbox.id}
    id = {checkbox.id}
    name = "cuisineType"
    value = {checkbox.value}
    onChange = {this.onChange}
    onClick = {this.handleCuisineSel} >
    </Checkbox>
    <p> {checkbox.id} </p>
      </button>
  ))
  return renderSurvey;
}

// =====================

  render() {
    if (this.state.showRestInfo === true) {
      return ( <
        Wrapper >
        <div className="container">
        <Jumbotron />
        <SiteNav />
        </div>
      <div className="row">
        <div className = "topBox col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
            <p > Enter your location! </p>
              <input name = "loSearch" value = {this.state.loSearch} onChange = {this.handleInputChange} placeholder = "Location Search" />

          <button className="thesubmitbtn" onClick = {this.submitRecAndRestApi} type = "success" > Search </button>

          <div>
            <p> Number of Venues Found: {this.state.restResultsFound}</p>
            <p> Number of Recipes Found: {this.state.recResultsFound} </p>
          </div>
            <p> Pick your cuisine!</p>
            <p>{this.state.isCuisineSelected}</p>
          <div>
              {this.renderCuisOp()}
          </div>
        </div>
      </div>


        <div >
          <div className="renderRestCard col-lg-11 col-md-12 col-md-offset-1 col-sm-12">
              {this.renderRestCard()}
          </div>
          <div className="renderRecCard col-lg-12 col-md-12 col-sm-12">
              {this.renderRecCards()}
          </div>
        </div>

        </Wrapper>
      )
    } else {
      return (
        <Wrapper >

          <div className="container">
            <Jumbotron />
            <SiteNav />
            </div>
            <div className="row">
            <div className = "topBox col-lg-8 col-lg-offset-2 col-md-12 col-sm-12">
                <p > Enter your location! </p>
                  <input name = "loSearch" value = {this.state.loSearch} onChange = {this.handleInputChange} placeholder = "Location Search" />

              <button onClick = {this.submitRecAndRestApi} type = "success" > Search </button>

              <div>
                <p> Number of Venues Found: {this.state.restResultsFound}</p>
                <p> Number of Recipes Found: {this.state.recResultsFound} </p>
              </div>
                <p> Pick your cuisine!</p>
                <p>{this.state.isCuisineSelected}</p>
              <div>
                  {this.renderCuisOp()}
              </div>
            </div>

          </div>
            <div className="renderVenCard col-lg-12 col-md-12 col-sm-12">
              {this.renderVenCard()}
            </div>
            <div className="renderRestCard col-lg-offset-2 col-lg-9 col-md-12 col-md-offset-1 col-sm-12">
              {this.renderRestCard()}
            </div>
            <div className="renderRecCard col-lg-12 col-md-12 col-sm-12">
              {this.renderRecCards()}
          </div>
      </Wrapper>
      )
    }
  }
}

export default SearchPage;
