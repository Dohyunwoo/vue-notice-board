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
        <pre>{{board.data.text}}</pre>
      </div>
      <div class="uk-flex uk-flex-right">
        <router-link :to="{ name: 'edit', params: { id: board.id }}">
          <button class="uk-button uk-button-primary
            uk-margin-right">수정 하기</button>
        </router-link>
        <button class="uk-button uk-button-danger
          uk-margin-right" type="button" @click="deleted">
          삭  제</button>
        <router-link to="/">
          <button class="uk-button uk-button-secondary">목록 으로</button>
        </router-link>
      </div>
    <Footer />
  </div>
</template>
<script>
import { reactive } from 'vue'
import Footer from '@/components/footer'

const url = "https://vue-notice-board.firebaseio.com/board/list"
const deleteUrl = "https://vue-notice-board.firebaseio.com/board.json"

export default {
  components : { Footer },
  setup() {
    let board = reactive({
      data : {},
      deleted: {},
      id : location.pathname.split('/')[2]
    });
    const title = `/${board.id}.json`;
    fetch(url+title).then(res => res.json()).then(response => {
      board.data = response;
    }).catch(error => {
      console.error('Error:', error);
      alert("글을 읽어 오는데 실패했습니다.")
    })

    function deleted() {
      board.deleted[`/list/${board.id}`] = null;
      board.deleted[`/trash/${board.id}`] = {...board.data};

      console.log(board.deleted)

      if ( confirm("정말 삭제하시겠습니까?") == true ) {
        fetch(deleteUrl, {
          method: 'PATCH',
          body: JSON.stringify(board.deleted),
          headers:{'Content-Type': 'application/json'}
        }).then(res => res.json()).then(response => {
          console.log('Success:', JSON.stringify(response))
          alert("글이 삭제 되었습니다.")
        }).catch(error => {
          console.error('Error:', error);
          alert("글 삭제가 실패했습니다.")
        }).finally(() => {
          board = {};
          location.replace('/');
        });
      }
    }
    return { board, deleted }
  }
}
</script>
