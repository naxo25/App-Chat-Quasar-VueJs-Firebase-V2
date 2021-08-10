<template>
  <div class="q-pa-md">
    <q-list v-for="user, key in store.state.users" :key="key" flat>
      <q-item @click='loadChat(key)' class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.img || 'quasar-logo.svg'">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <!-- <q-icon name="chat_bubble" color="grey" /> -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store= inject('store')
    const router = useRouter()

    const loadChat = (otherKey) => {
      router.push('/Chat/' + otherKey)
    }

    return {
      store,
      loadChat
    }
  }
}
</script>