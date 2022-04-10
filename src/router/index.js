import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Search from '../components/Search'
import sell from '../components/sell'
import Artdetails from '../components/Artdetails'
import Addtocart from '../components/Addtocart'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/register', component: Register },
      { path: '/login', component: Login },
      { path: '/profile/:id?', component: Profile },
      { path: '/profile/details-art/:id?', name: Artdetails, component: Artdetails,  },
      { path: '/search', component: Search },
      { path: '/profile/sell', component: sell },
      {path: '/add-to-cart/:id', component: Addtocart}
    ]
})

export default router;

