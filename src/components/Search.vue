<template>
  <div>
    <div class="container">
      <input
        class="inputs"
        type="text"
        placeholder="Search Artwork and users"
      />
      <img class="imgg" src="favicon.ico" />
    </div>
    <div class="gcontainer1">
      <div v-for="artwork in artworks" :key="artwork.id">
        <router-link :to="`/profile/${artwork.artist.id}`">
          <div class="image" style="margin-top: 30px">
            <img class="image_img" v-bind:src="artwork.image_path" />
            <div class="image_overlay">
              <div class="image_delete">Delete</div>
              <div class="image_details">
                <div>Artist:{{ artwork.artist.name }}</div>
                <div>CreatedOn: {{ artwork.created_date }}</div>
              </div>
            </div>
          </div>
        </router-link>
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
      artworks: undefined,
      id: "",
    };
  },
  //used to send http req and fetch data to render on component.
  // mounted(){
  // },
  created() {
    //  const id = this.$route.params.id || localStorage.getItem('id');
    // console.log(id);
    this.searchAll();
  },
  methods: {
    searchAll() {
      axios
        .get("/art-works", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.artworks = res.data.data;
          //this.id = res.data.data.id;

          console.log(res);
          //    console.log(this.id)
        });
    },
    userDetails(id) {
      const user = id;
      console.log(user);
      //
      this.$router.push("profile/id");
      //this.$router.push({ name: 'Profile',  params: { id: 'user' } })
      //this
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  position: relative;
}
.container .inputs {
  border: 0;
  border-radius: 5px;
  width: 50%;
  height: 50px;
}
.imgg {
  position: absolute;
  top: 18%;
  left: 72%;
}
.gcontainer1 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>