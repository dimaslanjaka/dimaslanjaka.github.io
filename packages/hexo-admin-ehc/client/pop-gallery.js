// 2018/02/04
var React = require('react/addons');
var Dropzone = require('./Dropzone')
var api = require('./api');

var PopGallery = React.createClass({

  getInitialState: function() {
    return {
      files: [
        // '/images/pasted-1.png',
        // '/images/pasted-2.png',
        // '/images/pasted-3.png',
        // '/images/pasted-4.png'
      ]
    }
  },

  componentDidMount: function () {
    console.log('get gallery....');
    api.gallery().then(result => {
      // console.log(result);
      this.setState({files: result});
    });
  },


  // FILE OBJECT:
  // lastModified:1516945524000
  // lastModifiedDate:Fri Jan 26 2018 13:45:24 GMT+0800 (CST) {}
  // name:"新年风-祝福语-换图.png"
  // preview:"blob:http://localhost:4000/cf7225a4-a054-4008-b49b-6359eb3cde6d"
  // size:894080
  // type:"image/png"
  // webkitRelativePath:""
  onDrop: function (files) {
    var context = this;
    var origFiles = context.state.files;
    // show local previe images first
    files.forEach(file => {
      // origFiles.push({name: file.name, date: file.lastModified});
      origFiles.splice(0, 0, {preview: file.preview});
    });
    context.setState({files: origFiles});

    // sending....
    api.uploadMultiFiles(files).then(result => {
      // FIXME, lazy reload images to wait image file write to disk @2018/02/22
      setTimeout(()=>{
        api.gallery().then(result => {
          // console.log(result);
          context.setState({files: result});
        });
      }, 800);
    }).catch(error => {
      console.error(error);
    });
  },

  // @2018/02/23
  _onChange: function (name, evt) {
    if (evt) {evt.preventDefault()}
    // console.log(name);
    this.props.onChange(name);
  },

  render: function () {
    return (
      <div className="gallery">
        <div className="arrow-up"></div>
        <div className="header">Image Selector</div>
        <div className="grid">
          <Dropzone onDrop={this.onDrop} className="dropzone" accept="image/jpeg, image/png">
            <div className="drop-zone-txt">Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          {this.state.files.length > 0 ? <div>

            <div className="img-grid">{
              this.state.files.map((file) => {
                return (
                  <div className="img-ctnr" onClick={this._onChange.bind(null, file.name)}>
                    {file.preview?<div className="sending"><span>sending...</span></div>:null}
                    <img src={file.preview || '/images/'+file.name} className="img-cell"/>
                  </div>
                );
              })
            }</div>
          </div> : null}
        </div>

      </div>
    );
  },
});

module.exports = PopGallery
