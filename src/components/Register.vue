<template>
    <div class="page">
    <div class="container">
  <form>
  <label>First Name</label> <input type="text" name="name"  v-model="first_name" /> <br> <br>
  <label>Last Name</label> <input type="text" name="lname"  v-model="last_name" /> <br> <br>
  <label>Email:</label><input type="email" name="email"  v-model="email"/> <br> <br>
  <label>username</label>  <input type="text" name="username"  v-model="username"/> <br> <br>
  <label>Password</label>  <input type="password" name ="password" v-model="password"/><br>
  <br>

 <button  @click="addUser">Submit</button> <br>
 <router-link to='/login'>login</router-link>
  </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    msg: String
  },
  data(){
    return{
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: ""
    }
  },
  methods: {
    async addUser () {
      // here we are sending/posting data to db server
      let submit = await axios.post("http://llovas-backend.voltsquare.com/api/register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password,
      })
      console.log(submit, this.first_name, this.email)
      this.$router.push('/login');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
  display: flex;
  justify-content: center;
  border: 3px solid #b067b3;
  }
  input {
  border: 1px solid red;
  align-items:center
  }
  button{
    background: red;
    color:antiquewhite;
    border: none;
    padding: 15px;
  }

</style>
