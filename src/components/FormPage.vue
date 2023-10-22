<template>
  <div>
    <h1>Bonjour {{ this.username }} -- Page admin -- Ajouter un nouveau film</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="film.title" required>
      </div>

      <div>
        <label for="duration">Durée :</label>
        <input type="text" id="duration" name="duration" v-model="film.duration" required>
      </div>

      <div>
        <label for="language">Langue :</label>
        <input type="text" id="language" name="language" v-model="film.language" required>
      </div>

      <div>
        <label for="director">Réalisateur :</label>
        <input type="text" id="director" name="director" v-model="film.director" required>
      </div>

      <div>
        <label for="actors">Acteurs principaux :</label>
        <input type="text" id="actors" name="actors" v-model="film.actors" required>
      </div>

      <div>
        <label for="minAge">Âge minimum requis :</label>
        <input type="number" id="minAge" name="minAge" v-model="film.minAge" required>
      </div>

      <div>
        <label for="startDate">Date de début :</label>
        <input type="date" id="startDate" name="startDate" v-model="film.startDate" required>

        <label for="endDate">Date de fin :</label>
        <input type="date" id="endDate" name="endDate" v-model="film.endDate" required>
      </div>

      <div id="days">
        <div>
          <label for="MWF">Lundi Mercredi Vendredi</label>
          <input type="checkbox" id="MWF" name="daysOfWeek" v-model="film.daysOfWeek" value="MWF">
        </div>
        <div>
          <label for="TTS">Mardi Jeudi Samedi</label>
          <input type="checkbox" id="TTS" name="daysOfWeek" v-model="film.daysOfWeek" value="TTS">
        </div>
        <div>
          <label for="TFS">Mardi Vendredi Dimanche</label>
          <input type="checkbox" id="TFS" name="daysOfWeek" v-model="film.daysOfWeek" value="TFS">
        </div>

      </div>

      <div>
        <label for="startTime">Heure de début :</label>
        <input type="time" id="startTime" name="startTime" v-model="film.startTime" required>
      </div>

      <div>
        <label for="city">Adresse cinema :</label>
        <input type="text" id="city" name="city" v-model="film.city" required>
      </div>

      <div>
        <input type="submit" value="Enregistrer">
        <button>
          <router-link to="/">Se déconnecter</router-link>
        </button>
      </div>
    </form>
  </div>
</template>
  
  
<script>
import axios from 'axios';
import { useSessionStore } from '@/stores/session'



export default {
  data() {
    return {
      film: {
        title: '',
        duration: '',
        language: '',
        director: '',
        actors: '',
        minAge: null,
        startDate: '',
        endDate: '',
        daysOfWeek: [],
        startTime: '',
        city: '',
        id_owner: ''
      },
      id_user: '',
      username: ''
    };
  },
  setup(){
    const store = useSessionStore()

    return { store }
  },

  mounted() {
    if(this.store.getUserId() === ''){
      this.$router.push('/')
    }
    else{
      this.id_user = this.store.getUserId()
      this.username = this.store.getUsername()
      this.film.id_owner = this.store.getUserId()
    }
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:8081/movies/addMovie', this.film)
        .then(response => {
          // Gérez la réponse du serveur ici
          if (response.status === 200) {
            alert("Film ajouté avec succès !");
          }
        })
        .catch(error => {
          // Gérez les erreurs ici
          alert("Erreur lors de l'ajout du film: " + error);
        });
    }

  }
};
</script>
  
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #333;
}

form {
  max-width: 550px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 7px 0;
}

label {
  width: 30%;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
input[type="number"] {
  width: calc(70% - 40px);
  padding: 10px;
  margin: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="submit"],
input[type="button"],
button {
  background: #0074d9;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button {
  background: red;
}

a {
  text-decoration: none;
  text-decoration-line: none;
  color: inherit;
}

input[type="submit"]:hover {
  background: #0056b3;
}
</style>
