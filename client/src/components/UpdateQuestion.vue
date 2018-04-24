<template>
  <div class="modal fade" id="UpdateQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update The Question</h5>
          <button id="closeupdate" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title</label>
              <input v-model='title' name="title" type="text" class="form-control" id="recipient-name" placeholder="Input Title" v-validate="'required'" :class="{'error': errors.has('title') }">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Your Question:</label>
              <textarea v-model='content' name="content" class="form-control" id="message-text" placeholder="Ask your question here" v-validate="'required'" :class="{'error': errors.has('content') }"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click='update()'>Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapMutations,mapState,mapGetters
} from 'vuex'
export default {
  name: 'UpdateQuestion',
  data () {
    return {
      id : this.$route.params.id,
      title: '',
      content: ''
    }
  },
  methods: {
    ...mapActions([
      'updateQuestion'
    ]),
    update () {
        let newQuestion = {
          id: this.$route.params.id,
          title: this.title,
          content: this.content,
        }
        this.updateQuestion(newQuestion)
        document.getElementById('closeupdate').click()
    }
  },
  created() {
      this.title = this.getQuestion.title
      this.content = this.getQuestion.content
  },
  computed: {
      ...mapGetters(["getQuestion"])
  }
}
</script>
