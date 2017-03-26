const { dialog } = require('electron').remote
const fs = require('fs')
const marked = require('marked')
const highlightjs = require('highlight.js')
marked.setOptions({
  smartypants: true
  // highlight: function (code) {
  //   return require('highlight.js').highlightAuto(code).value
  // }
})
const renderer = new marked.Renderer()
renderer.table = (header, body) => {
  return '<table class="ui basic table"> <thead>' + header + '</thead> <tbody>' + body + '</tbody> </table>'
}
renderer.code = (code, language) => {
  const validLang = !!(language && highlightjs.getLanguage(language))
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code
  return `<div class="ui segment"><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`
}

document.getElementById('openFile').addEventListener('click', function () {
  dialog.showOpenDialog(function (files) {
    if (files === undefined) {
      console.log('No file selected')
    } else {
      fs.readFile(files[0], 'utf-8', (err, data) => {
        if (err) throw err
        document.getElementById('main').innerHTML = marked(data, { renderer })
      })
    }
  })
})

$('.ui.dropdown')
  .dropdown()
