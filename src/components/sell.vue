<template>
  <div class="container">
    <div class="upload">
      <input
        type="file"
        name="image"
        @change="handleImageSelector"
        accept="image/*"
      />
    </div>
  </div>
  <div class="formContainer">
    <div class="artwork">
      <img :src="image" style="width: 500px; height: 400px" class="more" />
    </div>
    <div class="form">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <label>Name</label> <br /><input
          class="inp"
          type="text"
          name="name"
          v-model="name"
          placeholder="Enter your name"
        />
        <br />
        <label>width</label> <br /><input
          class="inp"
          type="number"
          name="width"
          v-model="width"
          placeholder="Width of your artwork"
        />
        <br />
        <label>height</label><br /><input
          class="inp"
          type="number"
          name="text"
          v-model="height"
          placeholder="Height of your artwork"
        />
        <br />
        <label>created On</label><br />
        <input
          class="inp"
          type="date"
          name="date"
          v-model="created_date"
          format="YYYY-MM-dd"
          placeholder="Today's data"
        />
        <br />
        <label>material</label><br />
        <input
          class="inp"
          type="text"
          name="material"
          v-model="material"
          placeholder="Material you used in this artwork"
        /><br />
        <label>price</label><br />
        <input
          class="inp"
          type="text"
          name="price"
          v-model="price"
          placeholder=" Price"
        /><br />
        <button>Submit</button>
      </form>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import "../assets/styles.css";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      width: "",
      height: "",
      price: "",
      created_date: "",
      material: "",
      image: "",
      message: "",
      // id bhejo yaha pe bhe
      //
    };
  },

  methods: {
    handleImageSelector(event) {
      console.log(event);
      // if no image select it show error this code prevent that error
      // if(event.target.files.length == 0){
      //     imageFile.value  = "";
      //     imageURL.value = ""
      //     return;
      // }
      let imageFile = event.target.files[0];
      let imageURL = "";
      // imagefile array must be start from 0
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);

      // after reading image we create data to load using eventListener
      fileReader.addEventListener("load", () => {
        imageURL = fileReader.result; //it will display base 64
        console.log(imageURL);
        this.image = imageURL;
        console.log(this.image);
      });
    },
    handleSubmit() {
      // this is js class (formData)
      // let formData = new FormData();
      // formData.append('image', imageURL.value)
      // console.log(imageURL.value)
      axios
        .post(
          "art-works",
          {
            image: this.image,
            width: this.width,
            height: this.height,
            price: this.price,
            created_date: this.created_date,
            material: this.material,
            name: this.name,
          },
          {
            headers: {
              // give space to Bearer.
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          this.message = res.message;
          console.log(res, this.message);
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
.upload {
  border: 1px solid red;
  background: rgba(148, 147, 145, 0.952);
  border-radius: 5px;
  width: 70%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.formContainer {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: center;
  align-items: center;
}
.artwork {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>