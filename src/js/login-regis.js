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

// Convertir el objeto a formato JSON y almacenarlo en el localStorage
localStorage.setItem('usuario', JSON.stringify(usuario));


document.getElementById('formularioRegistro').reset();

       alert('Usuario registrado con éxito');
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