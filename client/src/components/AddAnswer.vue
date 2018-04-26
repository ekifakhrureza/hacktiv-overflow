<template>
  <div class="modal fade" id="AddAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Answer The Question</h5>
          <button id="closereply" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
              <label for="message-text" class="col-form-label">Your Answer:</label>
              <textarea v-model='comment' name="comment" class="form-control" id="message-text" placeholder="Input your answer here" v-validate="'required'" :class="{'error': errors.has('content') }"></textarea>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click='reply()'>Reply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "AddAnswer",
  data() {
    return {
      id: this.$route.params.id,
      comment: ""
    };
  },
  methods: {
    ...mapActions(["addAnswer", "getAllQuestion"]),
    ...mapMutations(['setToken','setTokenName','setTokenEmail']),
    reply() {
      let newAnswer = {
        id: this.$route.params.id,
        comment: this.comment
      };
      this.addAnswer(newAnswer);
      this.setToken(localStorage.getItem("token"));
      this.setTokenName(localStorage.getItem("name"));
      this.setTokenEmail(localStorage.getItem("email"));
      document.getElementById("closereply").click();
      this.comment = "";
    }
  }
};
</script>
