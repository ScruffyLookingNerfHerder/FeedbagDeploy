import React from "react";
import { Carousel } from "react-bootstrap";

const Circle = () => (

<Carousel className = "Carousel">
  <Carousel.Item>
    <img width={800} height={200} alt="800x200" src="/images/stove.jpg" />
    <Carousel.Caption>
      <h3><a target="_blank" href="https://www.foodnetwork.com/grilling">Top Summer Barbeque Recipes</a></h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={800} height={200} alt="800x200" src="/images/picnic.jpg" />
    <Carousel.Caption>
      <h3><a target="_blank" href="https://www.countryliving.com/food-drinks/g783/picnic-recipes-0609/">Cheap Picnic Ideas</a></h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={800} height={200} alt="800x200" src="/images/drink.jpg" />
    <Carousel.Caption>
      <h3><a target="_blank" href="http://www.foodandwine.com/slideshows/modern-summer-cocktails">Summer Cocktails</a></h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

);

export default Circle;
