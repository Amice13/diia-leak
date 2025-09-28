<template>
  <v-footer
    class="w-100 justify-space-around"
    app
    height="40"
  >
    <div class="text-caption text-disabled text-center">
      Ви можете абсолютно вільно та використовувати ці дані, розповсюджувати, використовувати у власних продуктах та продавати.
    </div>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
