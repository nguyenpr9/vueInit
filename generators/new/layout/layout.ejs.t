---
to: "src/router/layouts/<%= h.changeCase.kebab(name) %>.vue"
---
<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>


.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
