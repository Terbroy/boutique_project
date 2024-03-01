
    // Muestra el formulario de inicio de sesión al cargar la página
    document.getElementById('formularioInicio').style.display = 'block';
    document.getElementById('formularioRegistro').style.display = 'none';

function mostrarFormulario(tipo) {
    // Oculta ambos formularios
    const botonInicio = document.getElementById('buttonInicio');
    const botonRegis = document.getElementById('buttonRegistro');
    const formInicio = document.getElementById('formularioInicio');
    const formRegis = document.getElementById('formularioRegistro');

    formInicio.style.display = 'none';
    botonInicio.classList.remove("selected-button")
 
    formRegis.style.display = 'none';
    botonRegis.classList.remove("selected-button")

    // Muestra el formulario correspondiente al botón presionado
    if (tipo === 'inicio') {
    formInicio.style.display= 'block';
    botonInicio.classList.add("selected-button")
    } else if (tipo === 'registro') {
    formRegis.style.display = 'block';
    botonRegis.classList.add("selected-button")
    }
    
}

// DESDE ACA EMPIEZA EL ALMACENAMIENTO DE LOS DATOS DE REGITRO Y DE INICIAR SESION
function guardarDatos() {
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    // Verificar si los campos están vacíos
    if (!nombreCompleto || !telefono || !correo || !contrasena) {
        alert('Todos los campos son obligatorios');
        return;
    } 

    // Crear un objeto con la información del usuario
    const usuario = {
        nombreCompleto,
        telefono,
        correo,
        contrasena
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // Convertir el objeto a formato JSON y almacenarlo en el localStorage
    alert('Usuario registrado con éxito');


    // Limpiar el formulario después de guardar los datos
    document.getElementById('formularioRegistro').reset();


}

function iniciarSesion() {
    const correoLogin = document.getElementById('correoLogin').value;
    const contrasenaLogin = document.getElementById('contrasenaLogin').value;

    // Obtener el usuario registrado del localStorage
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuario'));

    // Verificar si el usuario existe y las credenciales coinciden
    if (usuarioRegistrado && usuarioRegistrado.correo === correoLogin && usuarioRegistrado.contrasena === contrasenaLogin) {
        alert('Inicio de sesión exitoso');
    } else {
        alert('Correo o contraseña incorrectos');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var correoInput = document.getElementById('correoLogin');
    var recordarCheckbox = document.getElementById('recordarUsuario');

    // Verificar si hay un usuario recordado
    var usuarioRecordado = localStorage.getItem('usuarioRecordado');

    if (usuarioRecordado) {
        correoInput.value = usuarioRecordado;
        recordarCheckbox.checked = true;
    }

    // Manejar el evento de envío del formulario
    document.getElementById('btnInicioSesion').addEventListener('click', function(event) {
        // Si el checkbox de recordar usuario está marcado, almacenar el usuario en localStorage
        if (recordarCheckbox.checked) {
            localStorage.setItem('usuarioRecordado', correoInput.value);
        } else {
            // Si el checkbox no está marcado, asegúrate de borrar el usuario almacenado previamente
            localStorage.removeItem('usuarioRecordado');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const olvidarPassLink = document.getElementById('olvidarPass');
    const modalResetPassword = document.getElementById('modalResetPassword');

    olvidarPassLink.addEventListener('click', function() {
        modalResetPassword.style.display = 'block';
    });

    // Cierra el modal cuando se hace clic en el botón "X" o fuera del modal
    const closeBtn = document.querySelector('.close');
    window.onclick = function(event) {
        if (event.target == modalResetPassword) {
            modalResetPassword.style.display = 'none';
        }
    }

    closeBtn.onclick = function() {
        modalResetPassword.style.display = 'none';
    };
});

function resetPassword() {
    // Aquí puedes agregar la lógica para enviar un correo electrónico de restablecimiento de contraseña
    // Por simplicidad, este ejemplo solo oculta el modal
    var modalResetPassword = document.getElementById('modalResetPassword');
    modalResetPassword.style.display = 'none';
    alert('Se ha enviado un correo electrónico de restablecimiento de contraseña.');
}