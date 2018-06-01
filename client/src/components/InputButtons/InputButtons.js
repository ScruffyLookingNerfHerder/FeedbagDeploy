import React from "react";

const InputButtons = props => (

    <div>
      <form>
        <input type="radio" name="restSearch" value="American "/>
        <input type="radio" name="restSearch" value="Chinese "/>
        <input type="radio" name="restSearch" value="Korean "/>
        <input type="radio" name="restSearch" value="Italian "/>
        <input type="radio" name="restSearch" value="Jamaican "/>
        <input type="radio" name="restSearch" value="Vegan "/>
        <input type="radio" name="restSearch" value="Spanish "/>
        <input type="radio" name="restSearch" value="Japanese "/>
        <input type="radio" name="restSearch" value="Thai "/>
        <input type="radio" name="restSearch" value="Mexican "/>
        <input type="radio" name="restSearch" value="Russian "/>
      </form
    </div>

);

export default InputButtons;


// // <p><strong>Website:</strong> {props.links}</p>
//
// { props.links ? (
//   <p><strong>Delivery:</strong> {props.links.url}</p>
// ) : (
//   <p>No Website Available</p>
// )}
