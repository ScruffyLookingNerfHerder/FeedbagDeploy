import React from "react";
import "./VenCard.css";


const VenCard = props => (

  <div className="venCardStyle panel panel-default">
    <div className="img-container">
    </div>
    <div className="panel-body">

      { props.img ? (
        <div className="imgContainer">
          <img src={ props.img } alt="img" className = "imgMaxSize"/>
        </div>
      ) : (
        <p><strong>No image available </strong> </p>
      )}

      <div className="infoBox">
        <p><strong>Name:</strong> { props.name }</p>
        <p><strong>Type:</strong> { props.type[0].shortName }</p>

        { props.price ? (
          <p><strong>Price Tier: </strong>{ props.price.tier }</p>
        ) : (
          <p><strong>Price Tier: </strong> No Info Available </p>
        )}

        { props.location ? (
          <p><strong>Address:</strong>{ props.location.address }</p>
        ) : (
          <p><strong>Address:</strong> No Info Available </p>
        )}

        { props.hours ? (
          <p><strong>Hours:</strong>{ props.hours.status }</p>
        ) : (
          <p><strong>Hours:</strong>No Info Available </p>
        )}

        { props.contact ? (
          <p><strong>Contact:</strong>{ props.contact.phone }</p>
        ) : (
          <p><strong>Contact:</strong>No Info Available </p>
        )}
        <p><a href={ props.url }><strong>Link</strong></a></p>

      </div>
    </div>
  </div>
);

export default VenCard;
