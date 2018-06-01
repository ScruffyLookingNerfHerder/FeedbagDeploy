import React from "react";

const RestCard = props => (

  <div className="card RestCard">
    <div className="img-container">
    </div>
    <div className="content">
      <p><strong>Name:</strong> {props.name}</p>
      <p><strong>Type:</strong> {props.categories[0].shortName}</p>

      { props.location.address ? (
        <p><strong>Address:</strong>{props.location.address}</p>
      ) : (
        <p><strong>Address:</strong>{props.location.formattedAddress} </p>
      )}

      { props.delivery ? (
        <p><strong>Delivery:</strong> Yes </p>
      ) : (
        <p><strong>Delivery:</strong> No </p>
      )}
    </div>
  </div>
);

export default RestCard;


// // <p><strong>Website:</strong> {props.links}</p>
//
// { props.links ? (
//   <p><strong>Delivery:</strong> {props.links.url}</p>
// ) : (
//   <p>No Website Available</p>
// )}
