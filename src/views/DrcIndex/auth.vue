<template>
  <div class="index-container" />
</template>
<script>
export default {
  mounted() {
    if (this.$route.query.meta) {
      this.$router.push({ path: '/redirect' })
    }
  }
}
</script>
