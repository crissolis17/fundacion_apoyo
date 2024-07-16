// Obtener aportadores del localStorage con manejo de errores
let aportadores = [];
try {
    aportadores = JSON.parse(localStorage.getItem('aportadores')) || [];
} catch (error) {
    console.error('Error al cargar aportadores:', error);
}

// Función para generar aportes más realista
function generarAportesParaAportador(aportador) {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const aportes = [];

    for (let mes = 0; mes < 12; mes++) {
        const fecha = new Date(anioActual, mes, 15);
        if (fecha <= fechaActual) {
            aportes.push({
                fecha: fecha.toISOString().split('T')[0],
                tipo: aportador.tipoAporte,
                monto: aportador.monto,
                estado: 'Pagado',
                aportador: aportador.nombre
            });
        }
    }

    return aportes;
}

let aportes = [];

// Función mejorada para mostrar aportes
function mostrarAportes(listaAportes) {
    const tbody = document.querySelector('#tabla-aportes tbody');
    tbody.innerHTML = '';
    let total = 0;

    if (listaAportes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No hay aportes para mostrar</td></tr>';
    } else {
        listaAportes.forEach(aporte => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aporte.fecha}</td>
                <td>${aporte.tipo}</td>
                <td>$${aporte.monto.toFixed(2)}</td>
                <td>${aporte.estado}</td>
                <td>${aporte.aportador}</td>
            `;
            tbody.appendChild(tr);
            if (aporte.estado === 'Pagado') {
                total += aporte.monto;
            }
        });
    }

    const totalElement = document.getElementById('total-aportes');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

function filtrarAportes() {
    const anioSelect = document.getElementById('anio');
    if (anioSelect) {
        const anio = anioSelect.value;
        console.log("Filtrando por año:", anio); // Para depuración
        const aportesFiltrados = aportes.filter(aporte => 
            aporte.fecha.startsWith(anio)
        );
        console.log("Aportes filtrados:", aportesFiltrados); // Para depuración
        mostrarAportes(aportesFiltrados);
    }
}

// Función para inicializar la página
function inicializarPagina() {
    const anioSelect = document.getElementById('anio');
    const filtrarButton = document.getElementById('filtrar');
    const verResumenButton = document.getElementById('ver-resumen');
    const descargarCertificadoButton = document.getElementById('descargar-certificado');

    // Generar aportes
    aportes = aportadores.flatMap(generarAportesParaAportador);
    console.log("Aportes generados:", aportes); // Para depuración

    if (anioSelect) {
        const anioActual = new Date().getFullYear();
        for (let i = anioActual; i >= anioActual - 2; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            anioSelect.appendChild(option);
        }
    }

    if (filtrarButton) {
        filtrarButton.addEventListener('click', filtrarAportes);
    }

    if (verResumenButton) {
        verResumenButton.addEventListener('click', () => alert('Mostrando resumen...'));
    }

    if (descargarCertificadoButton) {
        descargarCertificadoButton.addEventListener('click', () => alert('Descargando certificado...'));
    }
    
    mostrarAportes(aportes);
}

// Inicializar la página cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarPagina);