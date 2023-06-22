import React from "react";
import { ItemCard, ItemCardImg } from "./ImageGalleryItem.styled.jsx";

export const ImageGalleryItem = ({ id, webformatURL, tags }) => {
    return (<ItemCard>
        <ItemCardImg src={webformatURL} alt={tags} dataId={id} />
    </ItemCard>)
}