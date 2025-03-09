import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';

const HomeSectionCarousel = ({ Data, sectionName }) => {

  const responsive = {
    0: { items: 1 },
    568: { items: 3.5 },
    1024: { items: 5.5 },
  };

  const items = Data.map((item) => <HomeSectionCard  product={item} />);

  return (
    <div className="border">
      <h2 className="flex justify-center items-start py-10 text-2xl font-extrabold text-gray-800">
        {sectionName}
      </h2>
      <div className="mx-10 relative p-5">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          controlsStrategy="responsive"
        />
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
