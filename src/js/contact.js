document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let forms = document.querySelectorAll('.needs-validation');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        console.log("Mostrando algo");
      }

      form.classList.add('was-validated');
    }, false);
  });
});