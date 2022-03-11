<template>
  <div className="loginWiget">
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <div v-if="error" className="error">{{ error }}</div>
      <button v-if="!isPending">Log in</button>
      <button v-if="isPending" disabled>Loading</button>
    </form>
  </div>
</template>

<script>
import useLogin from "../../composables/useLogin";
import {ref} from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {error, login, isPending} = useLogin()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log("logging done")
        router.push({name: 'userPlaylist'})
      }
    }

    return {email, password, handleSubmit, error, isPending}
  }
}
</script>

<style>
body {
  background-color: white;
}

.loginWiget {
  margin-top: 10px;
}
</style>