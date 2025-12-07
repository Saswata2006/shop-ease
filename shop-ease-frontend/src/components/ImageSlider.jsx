import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
        title: 'Summer Sale',
        subtitle: 'Up to 50% Off on Summer Collection'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
        title: 'New Arrivals',
        subtitle: 'Check out the latest trends'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
        title: 'Exclusive Deals',
        subtitle: 'Limited time offers on top brands'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80',
        title: 'Electronics Hub',
        subtitle: 'Best gadgets at unbeatable prices'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        title: 'Home Makeover',
        subtitle: 'Redefine your living space'
    }
];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [current, length]);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <button className="left-arrow" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="right-arrow" onClick={nextSlide}>
                &#10095;
            </button>

            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <>
                                <img src={slide.image} alt="travel image" className="image" />
                                <div className="slide-content">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.subtitle}</p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <div className="slider-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={index === current ? 'dot active' : 'dot'}
                        onClick={() => setCurrent(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default ImageSlider;
