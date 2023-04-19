const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Лицей в Цифре",
    themeColor: "#6D9773",
    short_name: "Лицей"
  }
})
