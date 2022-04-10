<template>
  <div class="container123">
    <div class="name">
      <img
        style="
          width: 300px;
          height: 400px;
          border: 1px solid green;
          border-radius: 10px;
        "
        :src="sold.image_path"
      />
      <div class="fcontainer">
        <h1>Artist name: {{ sold.artist.name }}</h1>
        <h1>Created date: {{ sold.created_date }}</h1>
        <h1>username {{ sold.artist.username }}</h1>
        <h1>Price: ${{ sold.price }}</h1>
      </div>
    </div>
    <div class="price">
      <h1>Checkout</h1>
      <div class="bottom"></div>
      <h1>Cost</h1>
      <h1>Shipping</h1>
      <h1>Tax</h1>
      <div class="bottom"></div>
      <h1>Total</h1>
      <div class="bottom"></div>
      <button class="b1">Credid/Debit Card</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../assets/styles.css";
export default {
  data() {
    return {
      sold: "",
    };
  },
  created() {
    const id = this.$route.params.id;
    this.soldPage(id);
  },
  methods: {
    soldPage(id) {
      axios
        .get(`art-works/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.sold = res.data.data;
          // console.log("Details page"  + this.details)
          console.log("sold page" + this.sold);
        });
    },
  },
};
</script>

<style scoped>
.container123 {
  display: grid;
  grid-template-columns: 60% 40%;
  margin-top: 50px;
  margin-left: 100px;
}
.name {
  display: flex;
}
.fcontainer {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 10px;
  padding: 25px;
  color: whitesmoke;
}
.bottom {
  border-bottom: 1px solid black;
  width: 200px;
}
</style>