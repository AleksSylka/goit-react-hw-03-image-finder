import axios from 'axios';

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35896122-fa03778d72e83bb2517808476';
    #query = '';
    per_page = 12;

    getPhotoByQuery = async (newQuery, page) => {
        this.#query = newQuery;
        return await axios.get(`${this.#BASE_URL}`, {
            params: {
                q: this.#query,
                image_type : 'photo',
                orientation : 'horizontal',
                safesearch : 'true',
                page,
                per_page : this.per_page,
                key: this.#API_KEY,
        }})
    }

    /* set query(newQuery) {
        this.#query = newQuery;
    } */
}