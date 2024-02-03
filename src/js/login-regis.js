
    // Muestra el formulario de inicio de sesión al cargar la página
    document.getElementById('formularioInicio').style.display = 'block';

     function mostrarFormulario(tipo) {
            
        // Oculta ambos formularios
     document.getElementById('formularioInicio').style.display = 'none';
     document.getElementById('formularioRegistro').style.display = 'none';

        // Muestra el formulario correspondiente al botón presionado
     if (tipo === 'inicio') {
     document.getElementById('formularioInicio').style.display = 'block';
     } else if (tipo === 'registro') {
       document.getElementById('formularioRegistro').style.display = 'block';
     }
}