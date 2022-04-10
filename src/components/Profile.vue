<template>
  <div>
    <div class="container">
      <div class="c1">
        <div class="container2">
          <div class="loading" v-if="loading">Loading</div>
          <div v-else class="profile">
            <h2>fullname: {{ profile.name }}</h2>
            <h2>@{{ profile.username }}</h2>
            <h2 :id="profile.id">@{{ profile.total }}</h2>
            <h2>paypalEmail: {{ profile.paypal_email }}</h2>
          </div>
          <div>
            <form @submit.prevent="handleUpdate">
              <label>Firstname:</label> <br />
              <input
                class="inp"
                type="text"
                name="fname"
                v-model="first_name"
              />
              <br />
              <label>lastname:</label> <br />
              <input class="inp" type="text" name="lname" v-model="last_name" />
              <br />
              <label>username:</label> <br />
              <input
                class="inp"
                type="text"
                name="username"
                v-model="username"
              />
              <br />
              <label>Email:</label> <br />
              <input
                class="inp"
                type="text"
                name="email"
                v-model="paypal_email"
              />
              <br />
              <button>Submit</button>
            </form>
          </div>
        </div>
        <div class="borderline"></div>
        <div class="followers">
          <span class="fol">Followers:{{ followers.length }}</span>
          <span class="fol">Following:{{ followings.length }}</span>
          <span class="fol">Artwork:{{ profile.artworks_count }} </span>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">Loading</div>
    <div v-else class="gcontainer1">
      <router-link to="/profile/sell">
        <h1 style="padding-top: 60%; color: white" class="more">+</h1>
      </router-link>
      <div v-for="GetArtwork in GetArtworks" :key="GetArtwork.id">
        <router-link :to="`/profile/details-art/${GetArtwork.id}`">
          <div class="image" style="margin-top: 30px">
            <img class="image_img" :src="GetArtwork.image_path" />
            <div class="image_overlay">
              <div class="image_delete" @click="deleteArtwork">Delete</div>
              <div class="image_details">
                <div>Artist:{{ GetArtwork.artist.name }}</div>
                <div>CreatedOn: {{ GetArtwork.created_date }}</div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <!-- <h2>Display an Element on Hover</h2>
<div class="myDIV">Hover over me.</div>
<div class="hide">I am shown when someone hovers over the div above.</div> -->
</template>

<script>
import axios from "axios";
import "../assets/styles.css";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      paypal_email: "",
      profile: "",
      GetArtworks: "",
      id: "",
      loading: true,
      followers: "",
      followings: "",
    };
  },
  created() {
    const id = this.$route.params.id || localStorage.getItem("id");
    console.log("asd:" + id);
    this.getProfile(id);
    this.getArtwork(id);
    this.getFollowers(id);
    this.deleteArtwork(id);
  },
  // mounted(){
  //     // getting user's meta-data
  //     //axios.get('user/${id}') OR + id OR :id
  //     //92bc29497392445685f73014c16d5654
  //     //a2ea23698cea4e93b3efcd1ece282ca1
  //     axios.get('user/a2ea23698cea4e93b3efcd1ece282ca1',
  //     {headers: {Authorization: 'Bearer ' + localStorage.getItem('access_token')}
  //     })
  //     .then(res => {
  //     this.profile =res.data.data;
  //     const id = res.data.data.id
  //     console.log(id);
  //     });
  //         //get artwork of the user `art-works?user_id=${this.id}`
  //     axios.get('art-works?user_id=a2ea23698cea4e93b3efcd1ece282ca1',{
  //         headers: {Authorization: 'Bearer ' + localStorage.getItem('access_token')}
  //     }).then((res) =>{
  //         this.GetArtworks = res.data.data;
  //     })
  // },
  methods: {
    handleUpdate() {
      axios
        .patch(
          "user",
          {
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            paypal_email: this.paypal_email,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
    getProfile(id) {
      axios
        .get(`user/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          //I can get Id in console
          this.profile = res.data.data;
          //this.id = res.data.data.id
          // this.getArtwork(this.id);
        });
    },
    getArtwork(id) {
      axios
        .get(`art-works?user_id=${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.GetArtworks = res.data.data;
          this.loading = false;
          console.log("ID testing" + id);
        });
    },
    getFollowers(id) {
      axios
        .get(`followers/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.followers = res.data.data;
        });
      //getting following
      axios
        .get(`followings/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.followings = res.data.data;
        });
    },
    deleteArtwork(id) {
      axios
        .delete(`art-works/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container2 {
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: space-between;
  margin: 30px;
}
.c1 {
  border: 2px solid lightblue;
  border-radius: 50px;
  /* background: rgb(189, 160, 160); */
  width: 70%;
  height: 400px;
  background: #c33764; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.text {
  height: 10px;
  padding: 30px;
  color: #ff0;
  display: flex;
  justify-content: start;
  align-items: flex-start;
}
.username {
  margin-left: 20px;
}
.borderline {
  border-bottom: 2px solid rgb(250, 250, 250);
  width: 100%;
  padding: 0 0 10px 0;
}
.followers {
  display: flex;
  justify-content: space-between;
  padding: 35px;
  color: aliceblue;
}
.gcontainer1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
h1 {
  font-size: 50px;
  font-weight: 200;
  text-align: center;
  color: white;
  background: rgb(37, 36, 36);
}
.profile {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
  color: aliceblue;
}
button {
  border: 1px solid gray;
  border-radius: 5px;
  background: #4caf50;
  color: whitesmoke;
  padding: 5px;
  font-size: 10px;
  margin: 7px 0 0 90px;
}
button:hover {
  background: #45a049;
}
</style>