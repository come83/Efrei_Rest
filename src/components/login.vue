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
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
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
      login() {
        // Code de gestion de la connexion ici
        // Vous pouvez accéder aux données avec this.username et this.password
        // Par exemple, vous pouvez effectuer une requête AJAX pour vérifier les informations de connexion
        // Une fois la connexion réussie, vous pouvez rediriger l'utilisateur vers "admin.html"
        // window.location.href = "admin.html";

        let User = {
            username: this.username, 
            password: this.password
        }

        axios.get("http://localhost:8081/users/login" , { params: User })
        .then(response=>{
            if(response.status === 200){
              console.log(response.data)
              this.store.setUserId(response.data[0].id)
              this.store.setUsername(response.data[0].username)
              this.$router.push('/form-page')
            }
        }, err => {
            if(err.response.status === 401){
              console.log("No credentials or invalid credentials")
            }
        })
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
  
  input[type="submit"] {
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
  </style>
  