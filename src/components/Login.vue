<template>
  <form @submit.prevent="addUser">
    <label> EMAIL: <input type="email" name="email" v-model="email" /></label>
    <br />
    <br />
    <label>
      Password:
      <input type="password" name="password" v-model="password" /> </label
    ><br />
    <br />
    <button @click="addUser">Submit</button>
  </form>
  <router-link to="/register">register</router-link>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    //! here we are storing the token in the localStorage
    // * @add id

    async addUser() {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });
      console.warn(response, this.email, this.password),
        localStorage.setItem("access_token", response.data.data.access_token),
        localStorage.setItem("id", response.data.data.id);
      // here we call action from store to navigate to the home page

      this.$router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 2px solid red;
}
</style>