// Simulación de base de datos local usando localStorage
let aportadores = JSON.parse(localStorage.getItem('aportadores')) || [
    {id: 1, nombre: "MARIA GONZALEZ", email: "maria@example.com", tipoAporte: "mensual", monto: 100},
    {id: 2, nombre: "CARLOS RODRIGUEZ", email: "carlos@example.com", tipoAporte: "anual", monto: 1000},
    {id: 3, nombre: "ANA MARTINEZ", email: "ana@example.com", tipoAporte: "unico", monto: 500},
    {id: 4, nombre: "JUAN PEREZ", email: "juan@example.com", tipoAporte: "mensual", monto: 50},
    {id: 5, nombre: "LAURA SANCHEZ", email: "laura@example.com", tipoAporte: "anual", monto: 1200}
];

// Función para mostrar la lista de aportadores
function mostrarAportadores(lista) {
    const aportadorList = document.getElementById('aportador-list');
    aportadorList.innerHTML = '';
    lista.forEach(aportador => {
        const li = document.createElement('li');
        li.textContent = `${aportador.nombre} - ${aportador.tipoAporte} - $${aportador.monto}`;
        li.classList.add('aportador-item');
        aportadorList.appendChild(li);
    });
}

// Función para buscar aportadores
function buscarAportadores() {
    const searchTerm = document.getElementById('search-input').value.toUpperCase();
    const resultados = aportadores.filter(aportador => 
        aportador.nombre.toUpperCase().includes(searchTerm)
    );
    mostrarAportadores(resultados);
}

// Función para mostrar/ocultar el formulario
function toggleFormulario() {
    const formContainer = document.getElementById('form-container');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

// Función para guardar un nuevo aportador
function guardarAportador() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tipoAporte = document.getElementById('tipo-aporte').value;
    const monto = parseFloat(document.getElementById('monto').value);
    
    if (nombre && email && tipoAporte && monto) {
        const nuevoAportador = {
            id: aportadores.length + 1,
            nombre,
            email,
            tipoAporte,
            monto
        };
        
        aportadores.push(nuevoAportador);
        localStorage.setItem('aportadores', JSON.stringify(aportadores));
        
        alert(`Aportador guardado:\nNombre: ${nombre}\nEmail: ${email}\nTipo de Aporte: ${tipoAporte}\nMonto: ${monto}`);
        toggleFormulario();
        mostrarAportadores(aportadores);
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para generar reporte
function generarReporte() {
    window.open('reporte.html', '_blank');
}

// Event listeners y inicialización
window.onload = function() {
    mostrarAportadores(aportadores);
    
    document.getElementById('search-button').addEventListener('click', buscarAportadores);
    document.getElementById('search-input').addEventListener('input', buscarAportadores);
    
    document.getElementById('nuevo-aportador').addEventListener('click', toggleFormulario);
    document.getElementById('definir-aporte').addEventListener('click', () => alert('Definir detalles del aporte'));
    document.getElementById('generar-mandato').addEventListener('click', generarReporte);
    
    document.getElementById('guardar-aportador').addEventListener('click', guardarAportador);
    
    // Agregar botón para generar reporte
    const reporteButton = document.createElement('button');
    reporteButton.textContent = 'Generar Reporte';
    reporteButton.classList.add('button');
    reporteButton.addEventListener('click', generarReporte);
    document.querySelector('.sidebar').appendChild(reporteButton);
};