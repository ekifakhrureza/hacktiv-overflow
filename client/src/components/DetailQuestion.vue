<template>
  <div class="container">
    <router-link :to="{name:'home'}">
      <button class="float-left btn btn-outline-dark ml-2" id="comeback">
    			  <i class="far fa-arrow-alt-circle-left"> Back</i>
    		  </button>
    </router-link>
    <div v-if="getToken!==null && getTokenEmail===getQuestion.userId.email">
      <button class="float-left btn btn-outline-info ml-2" data-toggle="modal" data-target="#UpdateQuestion">
    			<i class="fas fa-edit"> Update</i>
    		</button>
      <button @click="remove(getQuestion._id,getQuestion.title)" class="float-left btn btn-outline-danger ml-2">
    			<i class="fas fa-trash"> Delete</i>
    		</button>
    </div>
    <h2 class="text-center">Question Detail</h2>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
            <p class="text-secondary text-center">{{ getQuestion.userId.name }}</p>
          </div>
          <div class="col-md-10">
            <p style="color:#007bff">
              <strong>{{ getQuestion.title }}</strong>
            </p>
            <div class="clearfix"></div>
            <p>{{ getQuestion.content }}</p>
            <p v-if="getToken!==null">
              <button class="float-right btn btn-outline-primary ml-2" data-toggle="modal" data-target="#AddAnswer">
    				      <i class="fa fa-reply"></i> Reply
    		        	</button>
              <a class="float-right btn text-white btn-danger ml-2" @click="downVoteQuest(getQuestion._id)"> 
                <i class="far fa-thumbs-down"></i> {{ getQuestion.voteDown.length }} </a>
              <a class="float-right btn text-white btn-primary ml-2" @click="upVoteQuest(getQuestion._id)"> 
                <i class="far fa-thumbs-up"></i> {{ getQuestion.voteUp.length }} </a>
            </p>
          </div>
        </div>
        <h3 class="text-center">{{ getAnswer.length }} Answer(s)</h3>
        <div class="card card-inner" v-for="(answer, index) in getAnswer" :key=index>
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                <p class="text-secondary text-center">{{ answer.userId.name }}</p>
              </div>
              <div class="col-md-10">
                <p> {{ answer.comment }}</p>
                <p v-if="getToken!==null">
                  <a class="float-right btn text-white btn-danger ml-2" @click="downVoteAnswer(answer._id,getQuestion._id)"> 
                    <i class="far fa-thumbs-down"></i> {{ answer.voteDown.length }} </a>
                  <a class="float-right btn text-white btn-primary ml-2" @click="upVoteAnswer(answer._id,getQuestion._id)"> 
                    <i class="far fa-thumbs-up"></i> {{ answer.voteUp.length }}  </a>
                </p>
              </div>
              <div v-if="getToken!==null && getTokenEmail===answer.userId.email">
                 <button @click="removeAnswer(answer._id,getQuestion._id)" class="float-left btn btn-outline-danger ml-2">
    			        <i class="fas fa-trash"> Delete</i>
    		      </button>
              </div>  
            </div>
          </div>
        </div>
        <AddAnswer />
        <UpdateQuestion />
      </div>
    </div>
  </div>
</template>

<script>
  import UpdateQuestion from "./UpdateQuestion";
  import {
    mapActions,
    mapGetters,
    mapState
  } from "vuex";
  import AddAnswer from "./AddAnswer";
  export default {
    name: "DetailQuestion",
    components: {
      AddAnswer,
      UpdateQuestion
    },
    data() {
      return {
        id: this.$route.params.id
      };
    },
    methods: {
      ...mapActions(['getDetailQuestion', 'removeQuestion','deleteAnswer'
      ,'upQuestion','downQuestion','upAnswer','downAnswer']),
      remove(idQuestion, title) {
        let confirmation = confirm(`Are you sure delete '${title}'?`)
        if (confirmation) {
          let delQuest = {
            id: idQuestion
          }
          this.removeQuestion(delQuest)
          document.getElementById('comeback').click()
        }
      },
      removeAnswer(idAnswer,idQuestion) {
        let confirmation = confirm(`Are you sure delete this answer?`)
        if (confirmation) {
          let delAnswer = {
            idAnswer: idAnswer,
            idQuestion: idQuestion
          }
          this.deleteAnswer(delAnswer)
        }
      },
      upVoteQuest (idQuestion) {
        let newVoteQuestion = {
          idQuestion: idQuestion
        }
        this.upQuestion(newVoteQuestion)
      },
      downVoteQuest (idQuestion) {
        let newVoteQuestion = {
          idQuestion: idQuestion
        }
        this.downQuestion(newVoteQuestion)
      },
      upVoteAnswer (idAnswer,idQuestion) {
        let newVoteAnswer = {
          idAnswer: idAnswer,
          idQuestion: idQuestion
        }
        this.upAnswer(newVoteAnswer)
      },
      downVoteAnswer (idAnswer,idQuestion) {
        let newVoteAnswer = {
          idAnswer: idAnswer,
          idQuestion : idQuestion
        }
        this.downAnswer(newVoteAnswer)
      }
    },
    created() {
      this.getDetailQuestion(this.id);
    },
    computed: {
      ...mapGetters(['getQuestion', 'getAnswer', 'getToken','getTokenEmail'])
    }
  }
</script>

