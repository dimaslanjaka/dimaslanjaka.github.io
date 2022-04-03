/**
 * handle multi image file upload
 * @2018/02/11
 */
var path = require('path');
var fs = require('hexo-fs');
var multipart = require('connect-multiparty');
var Promise = require("bluebird"); // @2018/02/23

module.exports = function (app, hexo) {
  var imagesFile = path.join(hexo.source_dir, 'hexo-admin-ehc-images.json');
  // default images;
  var imagesData = [
    {name: 'DASHENG-900x700-1.png', date: 1518959551960},
    {name: 'DASHENG-900x700-2.png', date: 1518959599098},
    {name: 'DASHENG-900x700-3.png', date: 1518959609913},
    {name: 'DASHENG-900x700-4.png', date: 1518959618105}
  ];

  var multipartMiddleware = multipart();

  // ------ process to client upload images ------
  app.use(hexo.config.root + 'admin/api/upload', multipartMiddleware);
  app.use(hexo.config.root + 'admin/api/upload', function(req, res) {
    var copyCntr = 0;
    var fileNum = Object.values(req.files).length;
    var promises = [];
    for(var key in req.files){
      var file = req.files[key];
      var key = Object.keys(file)[0];
      var fileItem = file[key];
      var filename = path.join('/images', fileItem.name);
      var outpath = path.join(hexo.source_dir, filename);
      promises.push(fs.copyFile(fileItem.path, outpath));
      // save the new image to memory
      imagesData.splice(0, 0, {name: fileItem.name, date: new Date().getTime()});
      // imagesData.push({name: fileItem.name, date: new Date().getTime()});
    }

    Promise.all(promises).then(function() {
      console.log("all the files were Copied");
      // refresh json file
      fs.writeFileSync(imagesFile, JSON.stringify(imagesData));
      // respond to client
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify({result: 'success'}));
    });

    // don't forget to delete all req.files when done
    delete req.files;
  });

  // ----------- read saved json data when restart server -----
  if(fs.existsSync(imagesFile)){
    var content = fs.readFileSync(imagesFile);
    imagesData = JSON.parse(content);
  }

  // --- init default data when first start server with admin-ehc ------
  if(fs.existsSync(imagesFile)) return;
  // create a json file for image options
  fs.writeFile(imagesFile, JSON.stringify(imagesData), function (err) {
    if (err) return console.log(err);
    console.log('json file created!');
  });

  // copy default image to source folder from plugin folder
  var adminImgs = path.join(__dirname, 'www/images');
  var outputdir = path.join(hexo.source_dir, 'images');
  imagesData.forEach(img => {
    fs.copyFile(
      path.join(adminImgs, img.name),
      path.join(outputdir, img.name),
      ()=>console.log('DaSheng Copied!')
    );
  });


}
