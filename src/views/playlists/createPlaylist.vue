<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{fileErr}}</div>

    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import {ref} from 'vue'
import useStorage from "../../composables/useStorage";
import useCollection from "../../composables/useCollection";
import getUser from "../../composables/getUser";
import { timestamp } from "../../firebase/config";
import {useRouter} from 'vue-router';

export default {
  setup(){
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const {user} = getUser()


    const title = ref('')
    const description = ref('')
    const file = ref('')
    const fileErr = ref(null)
    const isPending = ref(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if(file.value){

          isPending.value = true

          await uploadImage(file.value)
          // console.log('img uploadet', url.value)
          const res = await addDoc({
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverUrl: url.value,
            filePath: filePath.value,
            songs: [],
            createdAt: timestamp()
          })

          isPending.value = false

          if (!error.value){
            // console.log("playlist added")
            router.push({ name: 'playlistDetails', params: { id: res.id} })
          }
        }
    }

    //File check
    const types = ['image/png', 'image/jpeg', 'image/jpg']

    const handleChange = (e) => {
      const selected = e.target.files[0]
      console.log(selected)

      if(selected && types.includes(selected.type)){
        file.value=selected
        fileErr.value = null
      } else {
        file.value=null
        fileErr.value = 'Please select a png or jpeg image file'
      }
    }

    return{title,description,handleSubmit, handleChange, fileErr, isPending}
  }
}
</script>

<style scoped>

</style>