// Datos ficticios
const residentes = [
    { id: 1, nombre: "PEDRO PEREZ", edad: 89, condicion: "ALZHEIMER", contacto: "123-456-7890", rutina: "Medicación diaria 8am y 8pm" },
    { id: 2, nombre: "MARIA RODRIGUEZ", edad: 75, condicion: "ARTRITIS", contacto: "098-765-4321", rutina: "Fisioterapia los martes y jueves" },
    { id: 3, nombre: "JUAN GOMEZ", edad: 82, condicion: "HIPERTENSIÓN", contacto: "111-222-3333", rutina: "Control de presión arterial diario" }
];

// Guardar datos ficticios en localStorage
if (!localStorage.getItem('residentes')) {
    localStorage.setItem('residentes', JSON.stringify(residentes));
}

function mostrarResidente(residente) {
    const infoDiv = document.getElementById('residente-info');
    infoDiv.innerHTML = `
        <div class="resident-info">👤 ${residente.nombre}</div>
        <div class="resident-info">🔘 EDAD: ${residente.edad} AÑOS</div>
        <div class="resident-info">🧠 ${residente.condicion}</div>
        <div class="resident-info">📞 CONTACTO DE EMERGENCIA: ${residente.contacto}</div>
        <div class="resident-info">⏰ RUTINA Y MEDICINAS: ${residente.rutina}</div>
    `;
}

function buscarResidente() {
    const busqueda = document.getElementById('buscar').value.toLowerCase();
    const residentes = JSON.parse(localStorage.getItem('residentes'));
    const residenteEncontrado = residentes.find(r => r.nombre.toLowerCase().includes(busqueda));
    if (residenteEncontrado) {
        mostrarResidente(residenteEncontrado);
    } else {
        document.getElementById('residente-info').innerHTML = "Residente no encontrado";
    }
}

// Event Listeners
document.getElementById('buscar').addEventListener('input', buscarResidente);

document.getElementById('guardar').addEventListener('click', function() {
    alert('Función de guardar - a implementar');
});

document.getElementById('modificar').addEventListener('click', function() {
    alert('Función de modificar - a implementar');
});

document.getElementById('registrar').addEventListener('click', function() {
    alert('Función de registrar acción - a implementar');
});

// Mostrar el primer residente al cargar la página
window.onload = function() {
    const residentes = JSON.parse(localStorage.getItem('residentes'));
    if (residentes && residentes.length > 0) {
        mostrarResidente(residentes[0]);
    }
};