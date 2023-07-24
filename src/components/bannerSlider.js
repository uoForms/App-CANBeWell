import React from 'react'

// React Slick Carousel
import Slider from "react-slick";
import bannerImages from '../shared/bannerImages';

function BannerSlider(props) {
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
    <Slider {...bannerImageSettings} className='landing-logo-slider'>
      {bannerImages.map(bannerImage => {
        return (
          <div key={bannerImage.id}>
            <a href="#"><img className="landing-logo" src={bannerImage.image} alt={bannerImage.title} onClick={props.handleChange}
              test-id="logo" /></a>
          </div>
        )
      })}
    </Slider>
  )
}

export default BannerSlider
