// get form element
// var formEl = document.getElementById('form');
// var textareaEl = document.getElementById('paste-json');

// add event listener to the form
// formEl.addEventListener("submit", (e) => {
  // e.preventDefault();
  // get the value from submit field
  // var pastedJson = textareaEl.value;
  // console.log(pastedJson);

// })


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
      console.log(body);
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

$('download').on('click', function(e) {

});