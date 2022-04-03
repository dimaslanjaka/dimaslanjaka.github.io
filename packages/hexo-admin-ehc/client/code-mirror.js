
var React = require('react')
var CM = require('codemirror/lib/codemirror')
var PT = React.PropTypes
var api = require('./api')

var CodeMirror = React.createClass({
  propTypes: {
    onScroll: PT.func,
    forceLineNumbers: PT.bool,
    adminSettings: PT.object,
    onFocus: PT.func,
    onBlur: PT.func,
    onCusorActivity: PT.func
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.cm.setValue(this.props.initialValue)
    }
    // on forcing line numbers, set or unset linenumbers if not set in adminSettings
    if (prevProps.forceLineNumbers !== this.props.forceLineNumbers) {
      if (!(this.props.adminSettings.editor || {}).lineNumbers) {
        this.cm.setOption('lineNumbers', this.props.forceLineNumbers);
      }
    }
    if(prevProps.cusor !== this.props.cusor) {
      this.cm.focus(); // focus first is a must!
      this.cm.setCursor(this.props.cusor);
    }

    // COMPARE WITH PREVIOUS VALUE IS A MUST!
    // OTHERWISE LOOP INFINITELY
    // @2018/02/06
    if(prevProps.mdImg !== this.props.mdImg) {
      this.cm.focus(); // focus first is a must!
      var cursor = this.lastCusor; // gets the line number in the cursor position
      var pos = { // create a new object to avoid mutation of the original selection
          line: cursor.line,
          ch: 0 // set the character position to the START of the line
      }
      this.cm.replaceRange(this.props.mdImg+'\r\n', pos, pos); // adds a new line
    }
  },

  componentDidMount: function () {
    require('codemirror/mode/markdown/markdown')

    var editorSettings = {
      value: this.props.initialValue || '',
      theme: 'default',
      mode: 'markdown',
      lineWrapping: true,
    }
    for (var key in this.props.adminSettings.editor) {
      editorSettings[key] = this.props.adminSettings.editor[key]
    }
    // getDOMNode() ?
    this.cm = CM(this.getDOMNode(), editorSettings);
    this.cm.on('change', (cm) => {
      this.props.onChange(cm.getValue());
    })
    this.cm.on('scroll', (cm) => {
      var node = cm.getScrollerElement()
      var max = node.scrollHeight - node.getBoundingClientRect().height
      this.props.onScroll(node.scrollTop / max)
    })
    this.cm.on('focus', cm => {
      this.lastCusor = this.cm.getCursor();
      // @2018/02/06
      if(this.props.onFocus) this.props.onFocus();
    })
    this.cm.on('blur', cm => {
      this.lastCusor = this.cm.getCursor();
    })
    this.cm.on('cursorActivity', cm => {
      this.lastCusor = this.cm.getCursor();
    })
    var box = this.getDOMNode().parentNode.getBoundingClientRect()
    this.cm.setSize(box.width, box.height - 32)

    window.addEventListener('resize', this._onResize)

    document.addEventListener('paste', this._onPaste)
  },

  _onResize: function () {
    var box = this.getDOMNode().parentNode.getBoundingClientRect()
    // need to subtract header to get proper height without flexbox (see #124)
    this.cm.setSize(box.width, box.height - 32)
  },

  componentWillUnmount: function () {
    document.removeEventListener('paste', this._onPaste)
    document.removeEventListener('resize', this._onResize)
  },

  _onPaste: function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    if (!items.length) return
    var blob;
    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i].kind == 'file'){
        blob = items[i].getAsFile();
        break;
      }
    };
    if (!blob) return

    var settings = this.props.adminSettings
    var reader = new FileReader();
    reader.onload = (event) => {
      var filename = null;
      if (settings.options) {
        if(!!settings.options.askImageFilename) {
          var filePath = !!settings.options.imagePath ? settings.options.imagePath : '/images'
          filename = prompt(`What would you like to name the photo? All files saved as pngs. Name will be relative to ${filePath}.`, 'image.png')
        }
      }
      console.log(filename)
      api.uploadImage(event.target.result, filename).then((res) =>
        this.cm.replaceSelection(`\n![${res.msg}](${res.src})`)
      );
    };
    reader.readAsDataURL(blob);
  },

  /**
   * get codemirror instance
   * @return {[type]} [description]
   */
  getCodeMirror: function getCodeMirror() {
		return this.cm;
	},


  render: function () {
    return <div/>
  }
})

module.exports = CodeMirror
