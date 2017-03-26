const { dialog } = require('electron').remote
const fs = require('fs')
const marked = require('marked')

document.getElementById('openFile').addEventListener('click', function () {
  dialog.showOpenDialog(function (files) {
    if (files === undefined) {
      console.log('No file selected')
    } else {
      fs.readFile(files[0], 'utf-8', (err, data) => {
        if (err) throw err
        document.getElementById('main').innerHTML = marked(data)
      })
    }
  })
})

$('.ui.dropdown')
  .dropdown()
