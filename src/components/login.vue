<template>
    <div id="login_page">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username" required><br><br>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required><br><br>
        </div>
        <div>
          <input type="submit" value="Se connecter">
        </div>
        <div>
          <button>
            <router-link to="/movies">Voir les films</router-link>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { loginService } from '../services/userService.js';
  import { useSessionStore } from '@/stores/session'

  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    setup(){
      const store = useSessionStore()

      return { store }
    },
    mounted(){
      this.store.$reset()
    },
    methods: {
      async login() {
        let User = {
            username: this.username, 
            password: this.password
        }
        try {
          const response = await loginService(User);
          console.log(response)
          if(response.status === 200){
              console.log(response.data)
              this.store.setUserId(response.data.id)
              this.store.setUsername(response.data.username)
              this.$router.push('/form-page')
            }
        } catch (error) {
          console.log(error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Votre CSS va ici */
  body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
  }
  
  h2 {
    text-align: center;
    color: #333;
  }
  #login_page{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  form {
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
  }
  form div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  label {
    width: 30%;
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  input[type="text"],
  input[type="password"] {
    width: calc(70% - 40px);
    padding: 10px;
    margin: 0 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input[type="submit"], button {
    margin-top: 10px;
    background: #0074d9;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  input[type="submit"]:hover {
    background: #0056b3;
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
  </style>
  