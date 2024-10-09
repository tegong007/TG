<template>
  <button><slot></slot></button>
</template>

<style scoped lang="less">
button {
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    filter: brightness(80%);
  }
}
</style>
