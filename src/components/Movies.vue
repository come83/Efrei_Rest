<template>
    <div>
      <div class="centerDiv">
        <!-- Menu déroulant (select) -->
        <select v-model="selectedValue" @change="changeCinema">
          <option value="">Sélectionnez un cinéma</option>
          <option v-for="option in options" :key="option">{{option}}</option>
        </select>
      </div>
      <div>
        <h1>Liste des films</h1>
        <ul class="movie-list">
          <li v-for="(movie, index) in movies" :key="index" class="movie-item">
            <h2>{{ movie.title }}</h2>
            <p>Durée : {{ movie.duration }} minutes</p>
            <p>Réalisateur : {{ movie.director_name }}</p>
            <p>Langue : {{ movie.language_name }}</p>
            <p>Adresse du cinéma : {{ movie.adresse_cinema }}</p>
          </li>
        </ul>
      </div>
      <div class="centerDiv">
          <button>
            <router-link to="/">Se connecter page admin</router-link>
          </button>
        </div>
    </div>
  </template>
  

  <script>
import movieService from '@/services/movieService';
export default {
  data() {
    return {
      selectedValue: '',    // La valeur sélectionnée dans le select
      options: [],           // Les options du select (récupérées via Axios)
    
      movies: [], // Ceci est supposé être le tableau de films que vous récupérez de votre base de données
      groupedMovies: {}
    };
  },
  created() {
    this.getAddressCinema()
  },
  methods: {
    changeCinema() {
      let cinema = {
        address: this.selectedValue
      };
      movieService.changeCinema(cinema.address)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.movies = response.data;
          }
        }).catch(err => {
          if (err.response && err.response.status === 401) {
            console.log("Erreur lors de la récupération des films:", err);
          }
        });
    },

    getAddressCinema() {
      movieService.getAddressCinema()
        .then(response => {
          if (response.status === 200) {
            this.options = response.data.map(item => item.adresse_cinema);
          }
        }).catch(err => {
          if (err.response && err.response.status === 401) {
            console.log("No credentials or invalid credentials");
          }
        });
    }
  }
}
</script>
<style scoped>
.centerDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
    margin-top: 10px;
    background: #0074d9;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button {
    margin-top: 20px;
    background: green;
  }
  button > * {
    color: inherit;
    text-decoration: none;
    text-decoration-line: none;
  }
  button:hover {
    background: yellowgreen;
  }
  /* Style de base pour le select */
select {
  width: auto; /* Largeur du select */
  padding: 10px; /* Rembourrage (padding) interne du select */
  font-family: Arial, sans-serif; /* Police de caractères */
  font-size: 16px; /* Taille de police */
  border: 2px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  background-color: #fff; /* Couleur de fond */
  color: #333; /* Couleur du texte */
}

/* Style pour le survol du select */
select:hover {
  border-color: #666; /* Bordure au survol */
}

/* Style pour le select en focus */
select:focus {
  outline: none; /* Supprime la bordure en focus par défaut */
  border-color: #007bff; /* Bordure en focus */
}
.movie-list {
  list-style: none;
  padding: 0;
}

.movie-item {
  display: inline-block;
  width: 300px; /* Ajustez la largeur selon vos besoins */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
