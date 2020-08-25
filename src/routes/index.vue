<template>
  <div class="uk-container">
    <img class="uk-align-center"
      data-src="/images/logo.png" width="200"
      height="auto" alt="로고 이미지" uk-img>
    <div v-if="boardList.data">
      <List />
    </div>
    <div v-else class="uk-height-medium uk-card uk-card-default
      uk-card-body uk-flex uk-flex-center uk-flex-middle">
      등록된 글이 없습니다.
    </div>
    <div class="uk-margin uk-flex uk-flex-right">
      <router-link to="/write">
        <button class="uk-button uk-button-primary
          uk-align-right">글 쓰 기</button>
      </router-link>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/footer"
import List from "@/components/list"
import boardList from "@/services/board"

export default {
  components: { Footer, List },
  setup() {
    return { boardList }
  }
}
</script>
