import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { BtnLoad } from "components/Button/Button.styled";
import { PixabayAPI } from "components/service/image-pixabay";
import { Grid } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Loader/Loader.module.css';
import { ModalWindow } from "components/Modal/Modal";
import { toast } from 'react-toastify';
import {RemoveScroll} from 'react-remove-scroll';

const pixabayApi = new PixabayAPI();

export class App extends Component {
  state = {
      data: [],
      query: '',
      largeImageURL: '',
      tags: '',
      page: 1,
      error: null,
      isLoading: false,
      isShowBtn: false,
      showModal: false,
  }

  componentDidUpdate(_, prevState) {
        const { query, page } = this.state;
        if (prevState.query !== query || prevState.page !== page) {
            this.getImages(query, page);
        }
    }
  
  getImages = (query, page) => {
    this.setState({ isLoading: true });

      pixabayApi.getPhotoByQuery(query, page)
          .then(({ data: { totalHits, hits } }) => {
            if (!hits.length) {
              return toast(`No photos were found for your query`);
            }
            if (page === 1) { toast(`Your query has been found ${totalHits} image`) };
            this.setState(prevState => ({ data: [...prevState.data, ...hits], isShowBtn: page < Math.ceil(totalHits / pixabayApi.per_page) }));
            
          })
          .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }

  formData = data => {
    this.setState({ query: data, page: 1, data: [], error: null, isShowBtn: false});
  }

  handleClickBtn = () => {
        this.setState(prevState => ({page: prevState.page +1}))
  }

  toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }))
  };

  handleModal = event => {
    const { localName, parentNode } = event.target
    const {data} = this.state
    if (localName === 'img' && parentNode.localName === 'li') {
      let i = this.state.data.findIndex(({webformatURL}) => (
        webformatURL === event.target.src
      ));
      this.setState({ largeImageURL: data[i].largeImageURL, tags: data[i].tags });
      this.toggleModal();
    }
  }

  render() {
    const { data, isLoading, isShowBtn, showModal, largeImageURL, tags } = this.state;
    return (
      <div className={css.App} onClick={this.handleModal}>
        <Searchbar onSubmit={this.formData} />
        
        <ImageGallery
          
          data={data}
        >
          
        </ImageGallery>
        <Grid
          height="80"
          width="80"
          color="#3bbcfd"
          ariaLabel="grid-loading"
          radius="12.5"
          visible={isLoading}
          wrapperStyle={{marginLeft: "auto", marginRight: "auto"}}
          
        />
        {isShowBtn && (<BtnLoad onClick={this.handleClickBtn}>Load more</BtnLoad>)}
        <ToastContainer />
        
        {showModal && (<RemoveScroll>
              <ModalWindow onClose={this.toggleModal} >
                <img src={largeImageURL} alt={tags}/>
              </ModalWindow>
            </RemoveScroll>)}
        
      </div>
    )
  }
}