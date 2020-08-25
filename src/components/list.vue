<template>
  <div class="uk-overflow-auto">
    <table v-if="isMobile.data"
      class="uk-table uk-table-striped uk-table-hover">
      <thead>
        <tr>
          <th class="uk-table-shirink">번 호</th>
          <th class="uk-table-expand">제  목</th>
        </tr>
      </thead>
      <tbody v-if="boardList.data">
        <tr v-for="(bl,index) in boardList.data" :key="index">
          <td>{{index}}</td>
          <td>
            <router-link 
              :to="{ name: 'read', params: { id: bl.id }}"
              style="color:black">
              {{bl.title}} ( {{bl.user}} )
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-else
      class="uk-table uk-table-striped uk-table-hover">
      <thead>
        <tr>
          <th>번  호</th>
          <th>작 성 자</th>
          <th>제  목</th>
          <th>등록 시간</th>
        </tr>
      </thead>
      <tbody v-if="boardList.data">
        <tr v-for="(bl,index) in boardList.data" :key="index">
          <td>{{index}}</td>
          <td>{{bl.user}}</td>
          <td>
            <router-link 
              :to="{ name: 'read', params: { id: bl.id }}"
              style="color:black">
              {{bl.title}}
            </router-link>
          </td>
          <td>{{bl.date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import isMobile from "@/services/is-mobile"
import boardList from "@/services/board"

export default {
  setup() {
    return { isMobile, boardList }
  }
}
</script>
