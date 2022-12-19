import React, { useState } from "react";
import './MovieRow.css';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
const MovieRow = ({title, items}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
        },
        created() {
        setLoaded(true)
        },
        slides: {
            perView: 10,
        },
    })
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                <div className="movieRow--list keen-slider" ref={sliderRef}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item keen-slider__slide number-slide">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
                {loaded && instanceRef.current && (
                    <div 
                        style={{
                            position: 'absolute', 
                            marginTop: '-120px', 
                            display: 'flex', 
                            width: '100%', 
                            left: 0, 
                            justifyContent: "space-between",
                            padding: '0 10px'
                        }}
                    >
                        <SlArrowLeft
                        size={36}
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                        />

                        <SlArrowRight
                            size={36}
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieRow;