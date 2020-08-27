<template>
  <div class="uk-container">
    <img class="uk-align-center"
      data-src="/images/logo.png" width="200"
      height="auto" alt="로고 이미지" uk-img>
      <div class="uk-margin">
        <h3 class="uk-heading-divider">제목 : {{board.data.title}}</h3>
        <p>작성시간 : {{board.data.date}}</p>
        <p>작성자 : {{board.data.user}}</p>
        <h4>본문 내용</h4>
        <p v-html="board.data.text"></p>
      </div>
      <div class="uk-flex uk-flex-right">
        <router-link :to="{ name: 'edit', params: { id: board.editUrl }}">
          <button class="uk-button uk-button-primary
            uk-margin-right">수정 하기</button>
        </router-link>
        <router-link to="/">
          <button class="uk-button uk-button-danger">목록 으로</button>
        </router-link>
      </div>
    <Footer />
  </div>
</template>
<script>
import { reactive } from 'vue'
import Footer from '@/components/footer'

const url = "https://vue-notice-board.firebaseio.com/board"

export default {
  components : { Footer },
  setup() {
    let board = reactive({
      data : {},
      editUrl : location.pathname.split('/')[2]
    });
    const title = `/${location.pathname.split('/')[2]}.json`;
    fetch(url+title).then(res => res.json()).then(response => {
      board.data = response;
    }).catch(error => {
      console.error('Error:', error);
      alert("글을 읽어 오는데 실패했습니다.")
    })
    return { board }
  }
}
</script>
