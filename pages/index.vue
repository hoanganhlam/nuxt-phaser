<template>
  <div class="mx-auto max-w-3xl h-full flex items-center flex-col justify-center py-8 space-y-6">
    <client-only>
      <game/>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
