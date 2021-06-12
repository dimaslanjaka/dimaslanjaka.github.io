jQuery(function ($) {
  $(document).on('change', '.file-field input[type="file"]', function () {
    var $this = $(this);
    var $fileField = $this.closest('.file-field');
    var $pathInput = $fileField.find('input.file-path');
    var files = $this.get(0).files;
    var fileNames = [];

    if (Array.isArray(files)) {
      fileNames = files.map(function (file) {
        return file.name;
      });
    } else {
      fileNames = Object.values(files).map(function (file) {
        return file.name;
      });
    }

    $pathInput.val(fileNames.join(', '));
    $pathInput.trigger('change');
  });
});