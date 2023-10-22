import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
    state: () => ({
        id_user : '',
        username: ''
      }),
    actions : {
        getUserId(){
            return this.id_user
        },
        setUserId(id){
            this.id_user = id
        },
        setUsername(newUsername){
          this.username = newUsername
        },
        getUsername(){
          return this.username
        }
    },
    persist : true
  // state
  // getters
  // actions
})