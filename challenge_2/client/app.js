const fileUpload = (file) => {
  var formData = new FormData();
  formData.append('file', file);
  $.ajax({
    type: 'POST',
    data: formData,
    url: '/',
    cache: false,
    contentType: false,
    processData: false,
    success: (body) => {
      var textareaElOld = document.getElementById('paste-json');
      var textareaEl = document.getElementById('result');
      textareaElOld.innerHTML = body.old;
      textareaEl.innerHTML = body.new;
    }
  });
};

$('form').on('submit', function(e) {
  e.preventDefault();
  var input = document.getElementById('json-file');
  var file = input.files[0];
  fileUpload(file);
});