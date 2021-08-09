<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          naxChatApp
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-item-label header>NaxChat</q-item-label>
      <q-item-label header>"Las tinieblas no se echan a manotazos, sino trayendo la luz"</q-item-label>
      <q-list v-for='link in links'>
        <q-item clickable tag="a" :to='link.to'>
          <q-item-section avatar>
            <q-icon :name="link.ico" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{link.name}}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click='$store.dispatch("logOut")'>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, provide } from 'vue'
import store from './store'

const links = [
  {
    to: '/', 
    name: 'Usuarios',
    ico: 'person' 
  }
]

export default {
  name: 'LayoutDefault',

  setup () {
    const Store = provide('store', store)
    return {
      leftDrawerOpen: ref(false),
      links,
      Store
    }
  },
  mounted () {
    this.$store.dispatch('handleAuthStateChanged')
  }
}
</script>

<style>
  * {
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
  }
  a img { 
    display: none
  }
</style>