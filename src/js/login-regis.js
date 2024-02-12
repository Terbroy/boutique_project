
    // Muestra el formulario de inicio de sesión al cargar la página
    document.getElementById('formularioInicio').style.display = 'block';

     function mostrarFormulario(tipo) {
            
        // Oculta ambos formularios
     document.getElementById('formularioInicio').style.display = 'none';
     document.getElementById('formularioRegistro').style.display = 'none';

        // Muestra el formulario correspondiente al botón presionado
     if (tipo === 'inicio') {
     document.getElementById('formularioInicio').style.display= 'block';
     } else if (tipo === 'registro') {
       document.getElementById('formularioRegistro').style.display = 'block';
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