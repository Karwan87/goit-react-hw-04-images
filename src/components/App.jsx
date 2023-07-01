import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

const App = () => {
  const [searchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const API_KEY = '35038868-0cefdd0904fdf8a70a3b6f6a2';

  const handleSearchSubmit = async searchQuery => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(data.hits);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (imageUrl, index) => {
    setIsModalOpen(true);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleItemClick} />
      {isLoading && <Loader isLoading={isLoading} />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal
          imageUrl={images[selectedImageIndex]?.webformatURL}
          onClose={() => setIsModalOpen(false)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default App;
