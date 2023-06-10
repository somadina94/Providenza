import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import classes from './Carousel.module.css';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.jpg';

function Carousels() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const imgArr = [img1, img2, img3, img4, img5];

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className={`${classes.carousel} ${classes['carousel-desktop']}`}
        >
            {imgArr.map((img, indx) => (
                <Carousel.Item className={`${classes['carousel-item']}`} key={indx}>
                    <img className={classes['c-img']} src={img} alt="first slide" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carousels;
