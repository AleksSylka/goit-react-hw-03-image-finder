import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { GalleryList } from "./ImageGallery.styled.jsx";
import React from "react";

class ImageGallery extends Component {

    render() {
        return (
        <>
            <GalleryList>
                {this.props.data.map(({id, largeImageURL, webformatURL, tags}) => (
                    <ImageGalleryItem key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        tags={tags}  
                    >   
                    </ImageGalleryItem>
                ))}     
            </GalleryList>
                
        </>)
    }
}

export default ImageGallery;