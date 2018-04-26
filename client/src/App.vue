<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link :to="{name:'home'} ">
          <a class="navbar-brand" href="#">Hacktiv Overflow</a>
        </router-link>  
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
               <router-link :to="{name:'home'} ">
               <a class="nav-link" href="#">Home</a>
              </router-link>  
            </li>
            <li>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#"></a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" v-if="getToken===null">
            <button style="margin-right: 20px" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal" data-whatever="@getbootstrap">Login</button>
            <button class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#registerModal" data-whatever="@getbootstrap">Register</button>
          </form>
          <form class="form-inline my-2 my-lg-0" v-else>
            <span class="navbar-text" style="margin-right:30px"> 
              Welcome, <b> {{ getTokenName }}</b>
                </span>
            <button class="btn btn-dark" @click="logout()">Logout</button>
          </form>
        </div>
      </nav>
      <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" id="closelogin" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <form @submit.prevent="onSubmit()">
              <div class="modal-body">
                <div class="form-group">
                 <label for="recipient-name" class="col-form-label">Email:</label>
                  <input v-model="email" name="email" type="text" class="form-control" id="recipient-name" v-validate="'required|email'" :class="{'error': errors.has('email') }">
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                 <label for="message-text" class="col-form-label">Password:</label>
                  <input v-model="password" name="password" type="password" class="form-control" id="recipient-name" v-validate="'required|min:6'" :class="{'error': errors.has('password') }">
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="login()">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Register</h5>
              <button id="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <form @submit.prevent="onSubmit()">
              <div class="modal-body">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Name:</label>
                  <input v-model="name" name="name" type="text" class="form-control" id="recipient-name" v-validate="'required'" :class="{'error': errors.has('name') }">
                  <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Email:</label>
                  <input v-model="email" name="email" type="text" class="form-control" id="recipient-name" v-validate="'required|email'" :class="{'error': errors.has('email') }">
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Password:</label>
                  <input v-model="password" name="password" type="password" class="form-control" id="recipient-name" v-validate="'required|min:6'" :class="{'error': errors.has('password') }">
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="register()">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import axios from "axios";
  import {
		mapGetters, mapMutations
	} from 'vuex'
  export default {
    name: "App",
    data() {
      return {
        email: '',
        name: '',
        password: ''
      };
    },
    methods: {
      ...mapMutations(['setToken','setTokenName','setTokenEmail']),
      onSubmit () {
        this.$validator.validateAll()
      },
      register () {
        let email = this.email;
        let name = this.name;
        let password = this.password;
        axios
          .post("http://localhost:3000/users/register", {
            email: email,
            name: name,
            password: password
          })
          .then(data => {
            if (data.status === 202) {
              alert("Email Already Exist");
            } else {
              localStorage.setItem("name", data.data.name)
              localStorage.setItem("token", data.data.token)
              localStorage.setItem("email", data.data.email)
              this.setToken(localStorage.getItem('token'))
              this.setTokenName(localStorage.getItem('name'))
              this.setTokenName(localStorage.getItem('email'))
              document.getElementById("close").click()
              this.email = ''
              this.name = ''
              this.password = ''
              alert('Check your email to see our message')
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      login () {
        let email = this.email;
        let password = this.password;
        axios
          .post("http://localhost:3000/users/login", {
            email: email,
            password: password
          })
          .then(data => {
            if (data.status === 202) {
              alert("Wrong email/password")
            } else {
              localStorage.setItem("name", data.data.name)
              localStorage.setItem("token", data.data.token)
              localStorage.setItem("email", data.data.email)
              this.setToken(localStorage.getItem('token'))
              this.setTokenName(localStorage.getItem('name'))
              this.setTokenEmail(localStorage.getItem('email'))
               document.getElementById("closelogin").click()
              this.email = ''
              this.password = ''
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      logout () {
        console.log(this.getToken)
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        this.setToken(null)
        this.setTokenName(null)
        this.setTokenEmail(null)
      }
    },
    computed: {
			...mapGetters(['getToken','getTokenName'])
		}
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  #nav {
    padding: 30px;
  }
  
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
