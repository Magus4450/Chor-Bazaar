import React, { useState, useEffect } from 'react';
import data from "./sliderData.js"
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import './styles/slider-animation.css';
import './styles/styles.css'

const SliderComponent = () => {

    const [slider, setSlider] = useState([]);

    useEffect(() => {
        setSlider(data)
    },[])

    return (
        <div>
            <Slider className="slider-wrapper">
                {slider.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{ background: `url('${item.image}') no-repeat center center`, marginTop: "40px" , height: "40vh" }}
                    >
                      
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderComponent