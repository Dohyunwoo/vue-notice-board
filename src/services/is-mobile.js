import { reactive } from 'vue'

const isMobile = reactive({
  data : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

export default isMobile
