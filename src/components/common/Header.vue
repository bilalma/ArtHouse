<template>
    <div class="header">
        <div class="inner-header">
        <div class="logo">
            <router-link to ="/"><h3>ArtHouse</h3></router-link>
        </div>
        <div class="navigation">
            <router-link to="search"><fa style="padding-top: 15px; color: white" icon="search"/> <li>Search</li> </router-link>
            <router-link to="/"><li>Home</li> </router-link>
            <router-link to="/profile"> <li>Profile</li> </router-link>
            <router-link to="register" @click="handleClick"><li>Logout</li></router-link>
        </div> 
       </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    
    computed:{
        //this property is used for mapGetters 
        ...mapGetters(['users'])    
    },
    methods: {
        handleClick(){
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 50px;
    border: 2px solid rgba(240, 222, 222, 0.938);
    background: black;
    display: block
} 
.inner-header{
    display: block;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
}
.logo{ 
    float: left;
    display: table;
    height: 100%;
}
.logo h3 {
    display: table-cell;
    vertical-align: middle;
    height: 100%;
    font-weight: 300;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 35px;
    color:whitesmoke;
}
.navigation {
    float: right;
    height: 100%;
    margin-left: 100px;
}
.navigation a {
    float: left;
    display: table;
    height: 100%;
}
.navigation li{
    vertical-align: middle;
    cursor: pointer;
    display: table-cell;
    padding-right: 60px;
    color: whitesmoke
}
</style>