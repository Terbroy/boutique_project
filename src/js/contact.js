document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let forms = document.querySelectorAll('.needs-validation');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        Swal.fire({
          icon: "error",
          title: "Algo falló",
          text: "Un dato que ingresaste es incorrecto",
        });
      } else {
        console.log("Mostrando algo");
        Swal.fire({
          icon: "success",
          title: "Se envió correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      }

      form.classList.add('was-validated');
    }, false);
  });
});