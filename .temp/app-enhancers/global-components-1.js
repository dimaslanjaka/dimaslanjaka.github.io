import Vue from 'vue'
Vue.component("demo-component", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\example\\.vuepress\\components\\demo-component"))
Vue.component("OtherComponent", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\example\\.vuepress\\components\\OtherComponent"))
Vue.component("Foo-Bar", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\example\\.vuepress\\components\\Foo\\Bar"))
Vue.component("BaseListLayout", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\global-components\\BaseListLayout"))
Vue.component("BlogTag", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\global-components\\BlogTag"))
Vue.component("BlogTags", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\global-components\\BlogTags"))
Vue.component("NavLink", () => import("D:\\dimaslanjaka.github.io\\.vuepress\\theme-blog\\global-components\\NavLink"))


export default {}