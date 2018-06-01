import React, { Component } from "react";
import { withUser } from '../../services/withUser';
import axios from "axios";
import AuthFailedPage from "../AuthFailedPage";
import SiteNav from "../../components/SiteNav";
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import Circle from "../../components/Carousel"
import RestCard from "../../components/RestCard"
import FavoritedRestCard from "../../components/FavoritedRestCard"
import Wrapper from "../../components/Wrapper"
import ResultButton from "../../components/ResultButton"
import API from "../../utils/API"
import "./RestaurantPage.css";

class RestaurantPage extends Component {

  state ={
    Restaurant: {}
  }


componentDidMount() {
// only try loading stuff if the user is logged in.
if (!this.props.user) {
      return;
    }
    console.log(this.props)
    API.getRestaurant(this.props.user.id, this.props.match.params.id)
    .then(res => {
      this.setState({ Restaurant: res.data })
      console.log(res.data)
    })
    .catch(err=>console.log(err));
  }




render() {
  const { user } = this.props; // get the user prop from props
  console.log(this.state.Restaurant)


    return (
      <Wrapper>
      <div className = "container">
        <Jumbotron />
        <SiteNav />

      </div >


        <div className = "specificrestaurantinfo">
          <h1> {this.state.Restaurant.name}</h1>
          <img className="chalkpic" src="/images/chalk-border.png"></img>
          <img className="specificrestaurantimg" src={this.state.Restaurant.photos}></img>
        <h2> Address: {this.state.Restaurant.address} </h2>
        <h2> City: {this.state.Restaurant.city} </h2>
        <h2> State: {this.state.Restaurant.state} </h2>
        <h2> Country: {this.state.Restaurant.country} </h2>
        <h5> Website: <a href={this.state.Restaurant.websiteURL}> {this.state.Restaurant.name} </a> </h5>

        <div className="back">
          <span>
      <a href={`/restaurants/`}> Click Here to Go Back to your favorites </a>
      </span>
</div>
</div>



      </Wrapper>

    )
  }
}

export default RestaurantPage;
