import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import heroEnvironment from '@/assets/hero-environment.jpg';
import heroGreenCity from '@/assets/hero-green-city.jpg';
import heroOcean from '@/assets/hero-ocean.jpg';

const images = [
  heroEnvironment,
  heroGreenCity,
  heroOcean,
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  // Auto change background every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-3xl text-white">

        {/* MAIN QUOTE (Two Lines Properly Styled) */}
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
          Cleanliness is not a duty imposed by law,<br />
          but a responsibility owed to society.
        </h1>

        {/* SMALL SUB QUOTE BELOW */}
        <p className="text-sm md:text-base italic opacity-80 mb-8">
          Every small action today creates a cleaner tomorrow.
        </p>

        {/* DESCRIPTION */}
        <p className="text-base md:text-lg opacity-90 mb-12">
          Proper waste management reduces pollution, prevents diseases,
          and builds sustainable communities for future generations.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            onClick={() => navigate('/recycling')}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full shadow-lg"
          >
            RECYCLING IDEAS
          </Button>

          <Button
            onClick={() => navigate('/report')}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full shadow-lg"
          >
            REPORT
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Hero;