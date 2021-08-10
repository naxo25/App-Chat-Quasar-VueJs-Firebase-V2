<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        label="Sunday, 19th"
      />
      <div v-for="chat in Chats">
	      <q-chat-message
	        :sent="chat.from === 'me'"
	        :avatar="chat.from === 'me' ? user.img || noimg : other.img || noimg"
	        :stamp="chat.hora"
	      >
          <iframe :src="chat.text" width="100" v-if='chat.tipo && chat.tipo === "gif"' frameborder="0" />
	      	<a v-else-if='chat.tipo === "url"' :href="chat.text" target="blank"> {{ chat.text }} </a>
          <img @click='fullscreen()' v-else-if='chat.tipo === "foto"' :src="chat.text" width="200" height="200" />
          <span v-else=''> {{ chat.text }} </span>
	      </q-chat-message>
      </div>
    </div>
    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input @keyup.enter='send' rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
        <q-btn @click='send' round flat icon="mic" />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>

import { inject, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = inject('store')
    const router = useRoute()
    const message = ref()
    const otherKey = router.params.otherKey
    
    const Chats = computed(() => {
      if(!store.state.chats[otherKey]) {
        console.log(false)
        store.dispatch('getChats', otherKey)
      }
      console.log(store.state.chats)
      return store.state.chats[otherKey]
    })

    const other = {
      name: '',
      img: store.state.users[otherKey].img
    }
    
    const send = () => {
      store.dispatch('send', {
        msj: message.value,
        otherKey
      })
      scrollTo({
        top: 99999,
        behavior: 'smooth'
      });
      message.value = ''
    }

    const fullscreen = () => {}

    return {
      noimg: 'favicon.ico',
      user: {
        name: store.state.user.name,
        img: store.state.user.img
      },
      other,
      store,
      Chats,
      fullscreen,
      send,
      message
    }
  }
}
</script>

<style lang="css" scoped>
  a {
    text-decoration: none; color: blue;
  }
</style>