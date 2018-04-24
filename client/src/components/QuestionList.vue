<template>
	<div class="container">
		<div v-if="getToken!==null">		
		  <button class="float-left btn btn-outline-success ml-2" data-toggle="modal" data-target="#AddQuestion">
				<i class="far fa-plus-square"> Ask Question</i>
			</button>
		</div>
		<h2 class="text-center">Question List</h2>
		<div class="card">
			<div class="card-body">
				<div class="row" v-for="(getQuestion,index) in getQuestion" :key="index">
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
						<p>
							<router-link :to="{name:'detail', params:{id:getQuestion._id} } ">
								<button class="float-right btn btn-outline-primary ml-2"> See Detail</button>
							</router-link>
						</p>
					</div>
				</div>
			</div>
		</div>
		<AddQuestion />
	</div>
</template>

<script>
	import AddQuestion from './AddQuestion'
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	
	export default {
		name: 'QuestionList',
		components : {
			AddQuestion
		},
		methods: {
			...mapActions(['getAllQuestion', 'getDetailQuestion']),
			getDetail(questionId) {
				this.getDetailQuestion(questionId)
			}
		},
		created() {
			this.getAllQuestion()
		},
		computed: {
			...mapGetters(['getQuestion','getToken'])
		}
	}
</script>

