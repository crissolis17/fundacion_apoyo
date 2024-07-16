// Simulación de una base de datos de residentes
const residentes = [
    { id: 1, nombre: "PEDRO PEREZ", edad: 65, condicion: "Hipertensión" },
    { id: 2, nombre: "MARIA RODRIGUEZ", edad: 78, condicion: "Diabetes" },
    { id: 3, nombre: "JUAN GONZALEZ", edad: 70, condicion: "Artritis" },
    { id: 4, nombre: "ANA MARTINEZ", edad: 68, condicion: "Osteoporosis" },
    { id: 5, nombre: "CARLOS SANCHEZ", edad: 72, condicion: "Parkinson" }
];

// Función para mostrar la lista de residentes
function mostrarResidentes(listaResidentes) {
    const lista = document.getElementById('resident-list');
    lista.innerHTML = '';
    if (listaResidentes.length === 0) {
        lista.innerHTML = '<li class="list-group-item">No se encontraron residentes</li>';
    } else {
        listaResidentes.forEach(residente => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<a href="gestion_residentes.html?id=${residente.id}" class="text-decoration-none">${residente.nombre}</a>`;
            lista.appendChild(li);
        });
    }
}

// Función para buscar residentes
function buscarResidentes() {
    const searchTerm = document.getElementById('search-input').value.toUpperCase();
    const residentesFiltrados = residentes.filter(residente => 
        residente.nombre.toUpperCase().includes(searchTerm)
    );
    mostrarResidentes(residentesFiltrados);
}

// Función para inicializar la página
function inicializarPagina() {
    // Mostrar todos los residentes al cargar la página
    mostrarResidentes(residentes);

    // Configurar event listeners
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton) {
        searchButton.addEventListener('click', buscarResidentes);
    }

    if (searchInput) {
        searchInput.addEventListener('input', buscarResidentes);
    }

    // Configurar botones de acción si existen
    const guardarBtn = document.getElementById('guardar');
    const modificarBtn = document.getElementById('modificar');
    const registrarBtn = document.getElementById('registrar');

    if (guardarBtn) {
        guardarBtn.addEventListener('click', () => alert('Función de guardar no implementada'));
    }

    if (modificarBtn) {
        modificarBtn.addEventListener('click', () => alert('Función de modificar no implementada'));
    }

    if (registrarBtn) {
        registrarBtn.addEventListener('click', () => alert('Función de registrar acción no implementada'));
    }
}

// Inicializar la página cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarPagina);