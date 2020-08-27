import { reactive } from 'vue'

const url = "https://vue-notice-board.firebaseio.com/board/list.json"

let boardList = reactive({
  data: []
});
fetch(url).then(res => res.json()).then(j => {
  console.log(j);
  Object.keys(j).map(arr => {
    j[arr].id = arr;
  })
  boardList.data = Object.values(j);
}).catch(err => {
  console.log(err);
  alert("글 목록을 불러오지 못 했습니다.");
});

export default boardList
