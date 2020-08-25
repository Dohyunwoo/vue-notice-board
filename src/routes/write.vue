<template>
  <div class="uk-container">
    <img class="uk-align-center"
      data-src="/images/logo.png" width="200"
      height="auto" alt="로고 이미지" uk-img>
    <form class="uk-form-stacked" v-on:submit.prevent="onSubmit">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">글 작성 하기</legend>
        <div class="uk-margin uk-flex">
          <div class="uk-margin-large-right">
            <label class="uk-form-label"
              for="form-stacked-user">작 성 자</label>
            <div class="uk-form-controls">
              <input class="uk-input" v-model="board.user"
                id="form-stacked-user">
            </div>
          </div>
          <div>
            <label class="uk-form-label"
              for="form-stacked-password">패 스 워 드</label>
            <div class="uk-form-controls">
              <input class="uk-input" type="password" v-model="board.pwd"
                id="form-stacked-password">
            </div>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label"
            for="form-stacked-title">제 목</label>
          <div class="uk-form-controls">
            <input class="uk-input" id="form-stacked-title"
              v-model="board.title">
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label"
            for="form-stacked-text">내 용</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" style="resize: none;"
              id="form-stacked-text" rows="5" v-model="board.text">
            </textarea>
          </div>
        </div>
        <div class="uk-flex uk-flex-right">
          <button class="uk-button uk-button-primary uk-margin-right">
            등  록</button>
          <router-link to="/">
            <button class="uk-button uk-button-danger">취  소</button>
          </router-link>
        </div>
      </fieldset>
    </form>
    <Footer />
  </div>
</template>
<script>
import { reactive } from 'vue'
import Footer from '@/components/footer'

const url = "https://vue-notice-board.firebaseio.com/board.json"

export default {
  components : { Footer },
  setup() {
    let board = reactive({});
    let title = "";
    function onSubmit() {
      board.date = new Date();
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(board),
        headers:{'Content-Type': 'application/json'}
      }).then(res => res.json()).then(response => {
        console.log('Success:', JSON.stringify(response))
        title = response.name
        alert("글이 작성되었습니다.")
      }).catch(error => {
        console.error('Error:', error);
        alert("글 작성이 실패했습니다.")
      }).finally(() => {
        board = {};
        location.replace(`/read/${title}`);
      });
    }
    return { board, onSubmit }
  }
}
</script>
