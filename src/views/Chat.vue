<template>
  <q-page class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px" class="chats"> 
      <!-- <q-chat-message
        label="Sunday, 19th"
      /> -->
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
  </q-page>
  <!-- <div class="nax-spinner"></div> -->
</template>

<script>

import { inject, onMounted, ref, computed, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = inject('store')
    const router = useRoute()
    const message = ref()
    const otherKey = router.params.otherKey
    // const limit = ref(20)
    
    const Chats = computed(() => {
      if(!store.state.chats[otherKey]) {
        store.dispatch('getChats', { otherKey, limit: 20 }).then(() => {
          scrollBottom()
        })
      }
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

    const scrollBottom = () => {
      setTimeout(() => {
        // document.querySelector('.nax-spinner').style.opacity = 0;
        document.querySelector('.chats').style.opacity = 1;
        // window.scroll(0, 99999)
        window.scrollTo({top: store.state.users[otherKey].scroll, behavior: 'smooth' })
      }, 50);
    }


    onMounted(() => {

      scrollBottom()
      let scroll = document.scrollingElement || document.body;
      let altoPost = scroll.scrollHeight;

      const Scroll = () => {
        store.state.users[otherKey].scroll = window.scrollY
        let alturamax = scroll.scrollHeight;

        if ( (window.scrollY < 200 && window.scrollY > 100 && alturamax != altoPost) ) {
          window.scroll(0, alturamax - altoPost)
          store.state.users[otherKey].msjs += 10;
          store.dispatch('getChats', { otherKey, limit: store.state.users[otherKey].msjs })
          altoPost = alturamax
        }
      }

      window.addEventListener('scroll', Scroll);

      onBeforeUnmount(() => {
        window.removeEventListener('scroll', Scroll);
      })

    })

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
  .nax-spinner {
    opacity: 1;
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 10em;
    height: 10em;
    position: absolute;
    top: 35%;
    right: 0;
    left: 0;
    z-index: 9999;
    margin: 60px auto;
    border-radius: 50%;
    font-size: 15px;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
    transition: .5s;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  .chats {
    opacity: 0;
    transition: .5s;
  }
</style>