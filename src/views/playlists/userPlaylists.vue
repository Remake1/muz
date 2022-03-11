<template>
  <div class="user-playlists">
    <h2>Your playlists:</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{name: 'createPlaylist'}" class="btn">Create playlist</router-link>
  </div>
</template>

<script>
import getCollection from "../../composables/getCollection";
import getUser from "../../composables/getUser";
import ListView from "../../components/ListView";

export default {
  components: {ListView},
  setup(){
    const {user} = getUser()
    const {documents: playlists} = getCollection(
        'playlists',
        ['userId', '==', user.value.uid]
    )

    return {playlists}
  }
}
</script>

<style scoped>
h2{
  margin-bottom: 40px;
}
</style>