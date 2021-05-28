const { router, server } = require('0http')({
  server: require('../src/server')()
})

const Busboy = require('busboy')

router.post('/upload', (req, res) => {
  const busboy = new Busboy({ headers: req.headers })
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
    file.on('data', function (data) {
      // console.log(data.toString()) // this should show the data we are trying to send via curl
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes')
    })
    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished')
    })
  })
  req.pipe(busboy)
})

server.listen(8000, () => { })
