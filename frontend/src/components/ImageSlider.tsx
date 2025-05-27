import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [images, setImages] = useState<{ _id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gallery/');
        const data = await response.json();
        if (response.ok) {
          setImages(data.images);
        } else {
          alert(data.message || 'Erro ao buscar imagens.');
        }
      } catch (err) {
        alert('Erro ao conectar com o servidor.');
      }
    };

    fetchImages();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((img) => (
        <div key={img._id}>
          <img 
            src={`http://localhost:5000/api/gallery/${img._id}`} 
            alt={img.name} 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} 
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;