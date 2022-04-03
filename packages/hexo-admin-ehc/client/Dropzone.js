/**
 * v 2.2.4 fix using reactjs v0.11.1
 * @2018/02/06
 */

// var React = require('react');
var React = require('react/addons');
var accept = require('attr-accept');

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      disableClick: false,
      multiple: true
    };
  },

  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string,
  },

  componentDidMount: function() {
    this.enterCounter = 0;
  },

  allFilesAccepted: function(files) {
    return files.every(file => accept(file, this.props.accept))
  },

  onDragEnter: function(e) {
    e.preventDefault();

    // Count the dropzone and any children that are entered.
    ++this.enterCounter;

    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

    // Now we need to convert the DataTransferList to Array
    var itemsArray = Array.prototype.slice.call(dataTransferItems);
    var allFilesAccepted = this.allFilesAccepted(itemsArray);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function (e) {
    e.preventDefault();
  },

  onDragLeave: function(e) {
    e.preventDefault();

    // Only deactivate once the dropzone and all children was left.
    if (--this.enterCounter > 0) {
      return;
    }

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    // Reset the counter along with the drag on a drop.
    this.enterCounter = 0;

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      var file = droppedFiles[i];
      file.preview = URL.createObjectURL(file);
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function () {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  // FIXME, use getDOMNode rather than findDOMNode
  open: function() {
    // console.log(this.refs.fileInput);
    // var fileInput = React.findDOMNode(this.refs.fileInput);
    var fileInput = this.refs.fileInput.getDOMNode()
    // console.log(fileInput);
    // fileInput.value = null;
    fileInput.click();
  },

  render: function() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive && this.props.activeClassName) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject && this.props.rejectClassName) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style, activeStyle;
    if (this.props.style || this.props.activeStyle) {
      if (this.props.style) {
        style = this.props.style;
      }
      if (this.props.activeStyle) {
        activeStyle = this.props.activeStyle;
      }
    } else if (!className) {
      style = {
        width: 390,
        height: 100,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5,
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    // FIXME, browserify cannot understand spread operator?
    // var appliedStyle;
    // if (activeStyle && this.state.isDragActive) {
    //   appliedStyle = {
    //     ...style,
    //     ...activeStyle
    //   };
    // } else {
    //   appliedStyle = {
    //     ...style
    //   };
    // };

    return (
      <div
        className={className}
        style={style}
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {this.props.children}
        <input
          type='file'
          ref='fileInput'
          style={{ display: 'none' }}
          multiple={this.props.multiple}
          accept={this.props.accept}
          onChange={this.onDrop}
        />
      </div>
    );
  }

});

module.exports = Dropzone;
