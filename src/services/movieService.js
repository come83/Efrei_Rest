import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/movies/';

const movieService = {
    changeCinema: function (cinemaAddress) {
        return axios.get(API_BASE_URL + 'showmovies', { params: { address: cinemaAddress } });
    },

    getAddressCinema: function () {
        return axios.get(API_BASE_URL + 'getAddressCinema');
    }
};

export default movieService;
