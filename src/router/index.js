import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/auth/login";
import signup from "../views/auth/signup";
import createPlaylist from "../views/playlists/createPlaylist";
import playlistDetails from "../views/playlists/playlistDetails";

import {projectAuth} from "../firebase/config";
import userPlaylists from "../views/playlists/userPlaylists";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user){
    next({name: 'Login'})
  }else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/playlists/create',
    name: 'createPlaylist',
    component: createPlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'playlistDetails',
    component: playlistDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/playlists/user',
    name: 'userPlaylist',
    component: userPlaylists,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
