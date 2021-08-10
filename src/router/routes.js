import AllChats from '../views/users.vue'
import Profile from '../views/Chat.vue'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AllChats,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/Chat/:otherKey',
    name: 'Chat',
    component: Chat,
    props: true,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

export default routes
