<template>
  <footer class="py-2 px-4 text-xs">
    <div class="max-w-lg mx-auto flex md:flex-row flex-col justify-between">
      <p class="text-gray-500 text-sm text-center md:text-left mb-2 md:mb-0">Copyright © 2021 ninosaur.com.</p>
      <div class="flex space-x-8 md:justify-right justify-center items-center">
        <a class="flex space-x-2 text-xs uppercase text-gray-400">
          <span>Whitepaper</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: "PFooter",
}
</script>

<style>
.connect {
  @apply bg-white p-4 shadow;
}
</style>
