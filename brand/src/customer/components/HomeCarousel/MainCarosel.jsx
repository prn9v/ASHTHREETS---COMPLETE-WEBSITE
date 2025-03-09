import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCarouselData from './MainCaroselData';


const items = MainCarouselData.map((item) => <div className='justify-center overflow-hidden aspect-w-16 aspect-h-9 mt-2'><img className='cursor-pointer w-full h-full object-contain ml-50' role='presentation' src={item.image}/></div>);

const MainCarousel = () => (
    <div className='my-10 '>
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
        />
    </div>
);

export default MainCarousel;