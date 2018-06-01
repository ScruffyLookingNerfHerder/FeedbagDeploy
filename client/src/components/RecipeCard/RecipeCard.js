import React from "react";
import scraper from '../../utils/scraper'
import "./RecipeCard.css"

const RecipeCard = props => (

  <div className="parent">
  <div className="card recRules">
    <div className="img-container">
    </div>
    <div className="content">
      <p><strong>{ props.title }</strong></p>
        <div>
          <img className="imgThis" src={ props.image_url } alt="img"/>
        </div>
      
      <p><a href={ props.href }>Get the Full Recipe Here!</a> </p>
    </div>
  </div>
</div>
);

export default RecipeCard;


// <div className="card">
//   <div className="img-container">
//   </div>
//   <div className="content">
//     <p><strong>Title:</strong> { props.title }</p>
//       <div>
//         <img src={ props.image_url } alt="img"/>
//       </div>
//     <p>
//       <strong>Get the Ingredients! </strong>
//         <a href={ props.source_url }>Link</a>
//     </p>
//   </div>
// </div>
// );
