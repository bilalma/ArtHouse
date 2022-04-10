<template>
  <div class="container">
    <div v-for="artwork in artworks" :key="artwork.id">
      <div class="div1">
        <div class="div2">
          <div class="u_f">{{ artwork.artist.username }}</div>
          <div v-if="artwork.is_following === true" class="u_f" @click="follow">
            follow
          </div>
          <div v-else class="u_f" @click="follow">follow</div>
        </div>
        <img class="feed" v-bind:src="artwork.image_path" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../assets/styles.css";
export default {
  data() {
    return {
      user: null,
      artworks: "",
      id: "",
    };
  },
  created() {
    this.home();
    // const response = await axios.get('login', {
    //     headers: {
    //         Authorization: 'Bearer' + localStorage.getItem('token')
    //     },
    // })
    //   console.log(response)
  },
  methods: {
    home() {
      axios
        .get("/home", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.artworks = res.data.data;
          this.id = res.data.data.id;
          console.log(this.follow(this.id));
          //this.id = res.data.data.id;

          console.log(res);
          //    console.log(this.id)
        });
    },
    follow() {
      //92bc29497392445685f73014c16d5654
      axios
        .post(
          `user/${this.id}/follow`,
          //this is data second argu if it is showing you an auth error or not showing token in it.
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 30%;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px 150px;
}
.div1 {
  border: 1px solid rgb(53, 49, 49);
  /* box-shadow: 10px 10px #888888; */
  margin: 30px 0;
}

.div2 {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  width: 100%;
  border-bottom: 2px solid rgba(97, 106, 97, 0.983);
  background: #00b4db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
