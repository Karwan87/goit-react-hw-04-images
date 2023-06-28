import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    currentPage: 1,
    selectedImageUrl: null,
    isModalOpen: false,
    selectedIndex: [],
  };
  API_KEY = '35038868-0cefdd0904fdf8a70a3b6f6a2';

  handleSearchSubmit = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${this.state.currentPage}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState({ images: data.hits, currentPage: 1 });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    try {
      this.setState({ isLoading: true });
      const nextPage = this.state.currentPage + 1;
      const response = await fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${nextPage}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        currentPage: nextPage,
      }));
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleItemClick = (imageUrl, index) => {
    this.setState({
      selectedImageUrl: imageUrl,
      selectedIndex: index,
      isModalOpen: true,
      selectedImageIndex: index,
    });
  };

  handlePrevImage = () => {
    const { images, selectedImageUrl } = this.state;
    const selectedIndex = images.findIndex(
      image => image.webformatURL === selectedImageUrl
    );
    if (selectedIndex > 0) {
      const prevImageUrl = images[selectedIndex - 1].webformatURL;
      this.setState({ selectedImageUrl: prevImageUrl });
    }
  };

  handleNextImage = () => {
    const { images, selectedImageUrl } = this.state;
    const selectedIndex = images.findIndex(
      image => image.webformatURL === selectedImageUrl
    );
    if (selectedIndex < images.length - 1) {
      const nextImageUrl = images[selectedIndex + 1].webformatURL;
      this.setState({ selectedImageUrl: nextImageUrl });
    }
  };

  render() {
    const { images, isLoading, selectedImageUrl, isModalOpen } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onItemClick={this.handleItemClick} />
        {isLoading && <Loader isLoading={isLoading} />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isModalOpen && (
          <Modal
            imageUrl={selectedImageUrl}
            onClose={() => this.setState({ isModalOpen: false })}
            onPrev={this.handlePrevImage}
            onNext={this.handleNextImage}
            selectedImageIndex={this.state.selectedImageIndex}
          />
        )}
      </div>
    );
  }
}

export default App;
