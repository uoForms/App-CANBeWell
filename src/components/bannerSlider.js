import React from 'react'

// React Slick Carousel
import Slider from "react-slick";
import bannerImages from '../shared/bannerImages';
import "../LandingPage.css"

function BannerSlider(props) {
  console.log(props);
  const bannerImageSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    autoplay: true,
    lazyLoad: 'progressive',
    accessibility: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  
  return (

    <Slider {...bannerImageSettings} className={`landing-logo-slider ${props.className}`}>
      {bannerImages.map(bannerImage => {

        return (
          <div key={bannerImage.id}>

            <a href="#" className="image-container"> 
            <img className="landing-logo image" src={bannerImage.image} alt={bannerImage.title} onClick={props.handleChange}
              test-id="logo" />
                
                 <div className="overlay-text"> {props.language === 'english' ? bannerImage.description_en: bannerImage.description_fr}</div>


                
              
              </a>

          </div>
        )
      })}
    </Slider>
  )
}

export default BannerSlider
