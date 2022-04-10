<template>
  <div>
    <div class="container">
      <div>
        <img class="image_img" :src="details.image_path" />
      </div>
      <div class="fcontainer">
        <h1>Seller name:{{ details.artist.name }}</h1>
        <p v-if="details.is_sold === false">Artwork Sold: Available</p>
        <p v-else>Artwork Sold: Sold</p>
        <p>username:{{ details.artist.username }}</p>
        <p id="d">date: {{ details.created_date }}</p>
        <p id="di">dimensions: {{ details.height }} X {{ details.width }}</p>
        <p id="di">Material used: {{ details.material }}</p>
        <h3>Price: ${{ details.price }}</h3>
        <router-link :to="`/add-to-cart/${details.id}`">
          <button id="b1">Add to cart</button>
        </router-link>
        <button id="b1">Follow</button>
        <button v-if="details.artist.id == details.id" id="b1">edit</button>
        <button v-else id="b1">BILALALLA</button>
      </div>
    </div>
    <h1 id="h1">More from Artist:</h1>
    <div class="gcontainer">
      <div v-for="mores in details.more_work.data" :key="mores.id">
        <div class="image">
          <img class="image_img" :src="mores.image_path" />
          <div class="image_overlay">
            <div class="image_delete">Delete</div>
            <div class="image_details">
              <div>Artist:{{ mores.artist.name }}</div>
              <div>CreatedOn: {{ mores.created_date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1>More ARTWORK:</h1>
    <div class="gcontainer">
      <img class="more" src="../assets/logo.png" />
      <img class="more" src="../assets/logo.png" />
      <img class="more" src="../assets/logo.png" />
      <img class="more" src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../assets/styles.css";
export default {
  props: ["baseURL", "GetArtworks"],
  data() {
    return {
      details: "",
      more: "",
    };
  },
  computed: {
    check() {
      return this.details.artist.id === localStorage.getItem("access_token");
    },
  },
  created() {
    const id = this.$route.params.id;
    this.getDetails(id);

    //this.art = this.GetArtworks
    //console.log("I am artdetails" +this.art)
  },
  methods: {
    getDetails(id) {
      axios
        .get(`art-works/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.details = res.data.data;
          this.more = res.data.data.more_work;
          // console.log("Details page"  + this.details)
          console.log("Details page" + this.more);
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 70% 30%;
  color: aliceblue;
}
.container img {
  border: 1px solid white;
  border-radius: 50px;
  margin-left: 70px;
  margin-top: 70px;
  width: 80%;
  height: 600px;
}
.fcontainer {
  display: flex;
  flex-direction: column;
  margin-top: 70px;
}
.fcontainer h1 {
  font-size: 30px;
  font-weight: 100;
  margin-bottom: 15px;
}
.fcontainer p {
  margin-bottom: 15px;
}
.fcontainer #d {
  margin-bottom: 15px;
}
.fcontainer #di {
  margin-bottom: 15px;
}
.fcontainer h3 {
  margin-bottom: 30px;
}
.fcontainer #b1 {
  margin-bottom: 20px;
  padding: 20px;
  color: white;
  border-radius: 50px;
  border: 1px solid lightblue;
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #0072ff,
    #00c6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #0072ff,
    #00c6ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.gcontainer {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin: 50px;
  gap: 15px;
}
.more {
  padding: 15px;
  height: 100%;
  width: 100%;
  opacity: 1;
  border-radius: 10px;
  border: 0.5px solid white;
  -webkit-transition: opacity 0.5s ease;
  transition: opacity 0.5s ease;
  border-radius: 10px;
}
#h1 {
  margin-left: 60px;
  margin-top: 35px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 35px;
}
</style>