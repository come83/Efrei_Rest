<template>
    <div>
      <div v-for="city in cities" :key="city">
        <h2>{{ city }}</h2>
        <ul>
          <li v-for="movie in groupedMovies[city]" :key="movie.id">
            {{ movie.title }} - {{ movie.director_name }} - {{ movie.language_name }} - {{ movie.duration }} min
          </li>
        </ul>
      </div>
    </div>
  </template>
  

  <script>
  import axios from 'axios';
export default {
  data() {
    return {
      movies: [], // Ceci est supposé être le tableau de films que vous récupérez de votre base de données
      groupedMovies: {}
    };
  },
  computed: {
    cities() {
      return Object.keys(this.groupedMovies);
    }
  },
  created() {
    // Supposez que vous avez une fonction fetchMovies qui récupère tous les films
    this.fetchMovies().then(movies => {
      this.movies = movies;
      this.groupByCity();
    });
  },
  methods: {
    async fetchMovies() {
  try {
    const response = await axios.get('http://localhost:8081/showmovies');

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
  }
}
,
    groupByCity() {
      this.groupedMovies = this.movies.reduce((acc, movie) => {
        const city = movie.adresse_cinema.split(' ')[1]; // Suppose que 'Cinema Paris 1' est le format
        if (!acc[city]) {
          acc[city] = [];
        }
        acc[city].push(movie);
        return acc;
      }, {});
    }
  }
}
</script>
