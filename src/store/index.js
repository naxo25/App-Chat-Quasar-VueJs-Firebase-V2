import { createStore } from 'vuex'
import users from '../api/users'
import chats from '../api/chats'
import firebase from '../api/firebase'
import { useRouter } from 'vue-router'

const { getUsers, getUser, getChats, Auth, sendChat } = firebase()

export default createStore({
  state: {
    users: {},
    chats: {},
    user: {
      name: 'naxweb',
      img: 'img/64219876.jpg',
      id: null,
      authRequired: false
    }
  },
  mutations: {
  },
  actions: {
    async getUsers ({ state }) {
      const data = await getUsers(state.user.id)
      data.onSnapshot(docSnapshot => {
        docSnapshot.forEach(async doc => {
          const friend = await getUser(doc.id)
          friend.onSnapshot(doc => {
            state.users[doc.id] = doc.data()
            state.users[doc.id].msjs = 20
            state.users[doc.id].scroll = 99999
          })
        });
      })
    },

    getChats ({state}, key) {
      const data = getChats(key)
      data.on('value', (snap) => {
        state.chats[snap.key] = snap.val()
      })
    },

    handleAuthStateChanged({ state, dispatch }) {

      const router = useRouter()

      Auth().onAuthStateChanged((user) => {
        if (user) {
          state.user.id = user.uid
          state.user.authRequired = true
          dispatch('getUsers')
          router.push('/')

        } else {

          router.replace({ path: '/Login' })

        }
      });

    },

    Login({}, payload) {

      const {email,pass} = payload 

      Auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        // Signed in
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    },

    Register(payload) {

      const { email, pass } = payload

      Auth().createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });

    },

    logOut({ state }) {
      state = null
      Auth().signOut()
      location.reload()
    },

    send ({}, { msj, otherKey }) {
      sendChat({msj, otherKey})
    }

  },
  modules: {
  }
})