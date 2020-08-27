<template>
  <div class="uk-container">
    <img class="uk-align-center"
      data-src="/images/logo.png" width="200"
      height="auto" alt="로고 이미지" uk-img>
    <form class="uk-form-stacked" v-on:submit.prevent="onUpdate">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">글 수정 하기</legend>
        <div class="uk-margin uk-flex">
          <div class="uk-margin-large-right">
            <label class="uk-form-label"
              for="form-stacked-user">작 성 자</label>
            <div class="uk-form-controls">
              <input class="uk-input" v-model="board.data.user"
                id="form-stacked-user" disabled>
            </div>
          </div>
          <div>
            <label class="uk-form-label"
              for="form-stacked-password">패 스 워 드</label>
            <div class="uk-form-controls">
              <input class="uk-input" type="password"
                v-model="board.data.pwd"
                id="form-stacked-password" disabled>
            </div>
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label"
            for="form-stacked-title">제 목</label>
          <div class="uk-form-controls">
            <input class="uk-input" id="form-stacked-title"
              v-model="board.data.title">
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label"
            for="form-stacked-text">내 용</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" style="resize: none;"
              id="form-stacked-text" rows="5" v-model="board.data.text">
            </textarea>
          </div>
        </div>
        <div class="uk-flex uk-flex-right">
          <button class="uk-button uk-button-primary uk-margin-right">
            수  정</button>
          <router-link :to="{ name: 'read', params: { id: board.id }}">
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

const url = "https://vue-notice-board.firebaseio.com/board/list"

export default {
  components : { Footer },
  setup() {
    let board = reactive({
      data : {},
      id : location.pathname.split('/')[2]
    });
    const title = `/${location.pathname.split('/')[2]}.json`;
    fetch(url+title).then(res => res.json()).then(response => {
      board.data = response;
    }).catch(error => {
      console.error('Error:', error);
      alert("글을 읽어 오는데 실패했습니다.")
    });

    function onUpdate() {
      board.data.date = new Date();
      fetch(url+title, {
        method: 'PUT',
        body: JSON.stringify(board.data),
        headers:{'Content-Type': 'application/json'}
      }).then(res => res.json()).then(response => {
        console.log('Success:', JSON.stringify(response))
        alert("글이 수정 되었습니다.")
      }).catch(error => {
        console.error('Error:', error);
        alert("글 수정이  실패했습니다.")
      }).finally(() => {
        board = {};
        location.replace(`/read/${location.pathname.split('/')[2]}`);
      });
    }
    return { board, onUpdate }
  }
}
</script>
