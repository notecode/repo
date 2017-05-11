<template>
  <modal name="hello" :width="200" :height="130" @opened="onOpen" @closed="onClose" >
    <div class="main">
      {{content}}
    </div>
  </modal>
</template>

<script>
export default {
  data () {
    return {
      content: '大概初恋无论是美好还是不堪都是每个人生命中很重要的回忆，高三那一年，我开始了人生的第一次恋爱，在2013年1月4日，他告诉我“希望我能一直陪在你身边，201314。” 在兵荒马乱的高三，我们相约每天5点起床去学校背书；会彼此给对方买早餐；买学习资料；那一年我偶像赵薇的《致青春》上映，4年前的小县城还没有电影院，他第一时间在网上下载了电影在他们班放映，然后所有的人陪我一起看了一部属于青春的电影；每一次考试都彼此鼓励打气，高考的前一天晚上他跨越半个城来我住的酒店下面给我加油打',
    }
  },
  methods: {
    onOpen () {
      console.log('you opened me');
    },
    onClose () {
      console.log('you closed me');
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
