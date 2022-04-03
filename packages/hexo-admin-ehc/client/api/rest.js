
var request = require('superagent')
var Promise = require('es6-promise').Promise

function _post(baseUrl, url, data) {
  return new Promise((f, r) => {
    var req = request.post(baseUrl + url)
    if (data) {
      req = req.send(data)
    }
    req.end((err, res) => {
      if (err) return r(err)
      f(res.body)
    })
  })
}

function _get(baseUrl, url, params) {
  return new Promise((f, r) => {
    var req = request.get(baseUrl + url)
    if (params) {
      req = req.query(params)
    }
    req.end((err, res) => {
      if (err) return r(err)
      f(res.body)
    })
  })
}

// upload multi files by html input element
// @2018/02/11
function _multiFiles(baseUrl, url, files) {
  return new Promise((f, r) => {
    const req = request.post(baseUrl + url); // : '/admin/api/upload'
    files.forEach(file => {
      // add Blob
      req.attach(file.name, file);
    });
    req.end((err, res) => {
      if (err) return r(err)
      f(res.body)
    });
  })
}

module.exports = function (baseUrl) {
  var post = _post.bind(null, baseUrl)
  var get = _get.bind(null, baseUrl)
  var multiFiles = _multiFiles.bind(null, baseUrl)

  return {
    posts: () => get('/posts/list'),
    post: (id, data) => {
      if (data) return post('/posts/' + id, data)
      return get('/posts/' + id)
    },
    newPost: (title) => post('/posts/new', {title: title}),
    pages: () => get('/pages/list'),
    page: (id, data) => {
      if (data) return post('/pages/' + id, data)
      return get('/pages/' + id)
    },
    deploy: (message) => post('/deploy', {message: message}),
    newPage: (title) => post('/pages/new', {title: title}),
    // for paste in editor
    uploadImage: (data, filename) => post('/images/upload', {data: data, filename: filename}),
    remove: (id) => post('/posts/' + id + '/remove'),
    publish: (id) => post('/posts/' + id + '/publish'),
    unpublish: (id) => post('/posts/' + id + '/unpublish'),
    renamePost: (id, filename) => post('/posts/' + id + '/rename', {
      filename: filename
    }),
    tagsCategoriesAndMetadata: () => get('/tags-categories-and-metadata'),
    settings: () => get('/settings/list'),
    setSetting: (name, value, addedOptions) => post('/settings/set', {
      name: name,
      value: value,
      addedOptions: addedOptions
    }),
    // add gallery api @2018/02/10
    gallery: () => get('/gallery/list'),
    setGallery: (name, createAt) => post('/gallery/set', {
      name: name,
      createAt: createAt
    }),
    // for Dropzone operation
    uploadMultiFiles: (files) => multiFiles('/upload', files)
  }
}
