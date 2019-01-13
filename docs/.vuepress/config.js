module.exports = {
  base: '/jarl-blog/',
  dest: './dist',
  repo: 'https://github.com/okbexx/jarl-blog',
  title: 'Hello ',
  description: 'coding for u',
  themeConfig: {
    repo: 'okbexx/',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      /*{ text: '关于我', link: '/my/' },*/
      {
        text: '我的项目',
        items: [
          { text: 'cytoscape-relate', link: '' },
        ]
      }
    ],
    sidebar: {
      '/blog/': [
        'git',
        'vue-amap',
        'js-function',
        'vuepress-theme'
      ]
    }
  }
}
