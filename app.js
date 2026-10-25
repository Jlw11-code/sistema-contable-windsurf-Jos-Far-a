// Cargar datos iniciales desde datos_financieros.json
let datos = {
    empleados: [],
    facturas_gastos: []
};

// Cargar datos desde el archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('datos_financieros.json');
        datos = await response.json();
        actualizarDashboard();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        // Usar datos por defecto si no se puede cargar el archivo
        datos = {
            empleados: [
                { id: 101, nombre: "Carlos Mendoza", cargo: "Analista Financiero", salario_base: 1200, horas_extras: 8 },
                { id: 102, nombre: "María Rodríguez", cargo: "Gerente de Operaciones", salario_base: 2500, horas_extras: 2 },
                { id: 103, nombre: "Alejandro Silva", cargo: "Asistente Administrativo", salario_base: 800, horas_extras: 15 }
            ],
            facturas_gastos: [
                { id_factura: "F-001", proveedor: "Suministros Oficina C.A.", monto: 450.00, categoria: "Operativo", deducible: true },
                { id_factura: "F-002", proveedor: "Servicios de Catering S.A.", monto: 1200.00, categoria: "Eventos", deducible: false },
                { id_factura: "F-003", proveedor: "Equipos Tecnológicos R.L.", monto: 850.00, categoria: "Activos", deducible: true }
            ]
        };
        actualizarDashboard();
    }
}

// Módulo de Nómina y Retenciones
function calcularNomina(empleado) {
    const valorHoraExtra = (empleado.salario_base / 160) * 1.5 * empleado.horas_extras;
    const retencionSS = empleado.salario_base * 0.04; // 4% Seguro Social
    const retencionISLR = empleado.salario_base > 1000 ? empleado.salario_base * 0.10 : 0; // 10% ISLR si salario > 1000
    const retencionesTotales = retencionSS + retencionISLR;
    const salarioNeto = empleado.salario_base + valorHoraExtra - retencionesTotales;

    return {
        valorHoraExtra: valorHoraExtra.toFixed(2),
        retencionSS: retencionSS.toFixed(2),
        retencionISLR: retencionISLR.toFixed(2),
        retencionesTotales: retencionesTotales.toFixed(2),
        salarioNeto: salarioNeto.toFixed(2)
    };
}

// Módulo de Auditoría de Gastos y Conciliación Fiscal
function calcularAuditoriaGastos() {
    const totalGastosBrutos = datos.facturas_gastos.reduce((sum, factura) => sum + factura.monto, 0);
    const totalDeduccionesFiscales = datos.facturas_gastos
        .filter(factura => factura.deducible)
        .reduce((sum, factura) => sum + factura.monto, 0);
    
    const gastosNoDeducibles = totalGastosBrutos - totalDeduccionesFiscales;
    const ivaGastosNoDeducibles = gastosNoDeducibles * 0.16; // 16% IVA
    
    // Utilidad bruta estimada (simplificada para el ejemplo)
    const utilidadBrutaEstimada = totalGastosBrutos * 0.3; // 30% margen estimado
    const islrCorporativo = utilidadBrutaEstimada * 0.15; // 15% ISLR corporativo
    
    const impuestoEstimadoPagar = ivaGastosNoDeducibles + islrCorporativo;

    return {
        totalGastosBrutos: totalGastosBrutos.toFixed(2),
        totalDeduccionesFiscales: totalDeduccionesFiscales.toFixed(2),
        gastosNoDeducibles: gastosNoDeducibles.toFixed(2),
        ivaGastosNoDeducibles: ivaGastosNoDeducibles.toFixed(2),
        utilidadBrutaEstimada: utilidadBrutaEstimada.toFixed(2),
        islrCorporativo: islrCorporativo.toFixed(2),
        impuestoEstimadoPagar: impuestoEstimadoPagar.toFixed(2)
    };
}

// Actualizar el Dashboard completo
function actualizarDashboard() {
    // Calcular totales de nómina
    let totalNominaNeta = 0;
    const tbodyNomina = document.getElementById('tbody-nomina');
    tbodyNomina.innerHTML = '';

    datos.empleados.forEach(empleado => {
        const calculos = calcularNomina(empleado);
        totalNominaNeta += parseFloat(calculos.salarioNeto);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.cargo}</td>
            <td>$${empleado.salario_base.toFixed(2)}</td>
            <td>${empleado.horas_extras}</td>
            <td>$${calculos.valorHoraExtra}</td>
            <td>$${calculos.retencionSS}</td>
            <td>$${calculos.retencionISLR}</td>
            <td style="font-weight: bold; color: #667eea;">$${calculos.salarioNeto}</td>
        `;
        tbodyNomina.appendChild(row);
    });

    // Calcular auditoría de gastos
    const auditoria = calcularAuditoriaGastos();
    const tbodyGastos = document.getElementById('tbody-gastos');
    tbodyGastos.innerHTML = '';

    datos.facturas_gastos.forEach(factura => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${factura.id_factura}</td>
            <td>${factura.proveedor}</td>
            <td>${factura.categoria}</td>
            <td>$${factura.monto.toFixed(2)}</td>
            <td>${factura.deducible ? '<span style="color: green; font-weight: bold;">Sí</span>' : '<span style="color: red;">No</span>'}</td>
        `;
        tbodyGastos.appendChild(row);
    });

    // Actualizar KPIs
    document.getElementById('kpi-nomina').textContent = `$${totalNominaNeta.toFixed(2)}`;
    document.getElementById('kpi-deducciones').textContent = `$${auditoria.totalDeduccionesFiscales}`;
    document.getElementById('kpi-impuesto').textContent = `$${auditoria.impuestoEstimadoPagar}`;
}

// Manejar formulario de empleado
document.getElementById('form-empleado').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nuevoEmpleado = {
        id: datos.empleados.length > 0 ? Math.max(...datos.empleados.map(e => e.id)) + 1 : 101,
        nombre: document.getElementById('emp-nombre').value,
        cargo: document.getElementById('emp-cargo').value,
        salario_base: parseFloat(document.getElementById('emp-salario').value),
        horas_extras: parseFloat(document.getElementById('emp-horas').value)
    };

    datos.empleados.push(nuevoEmpleado);
    actualizarDashboard();
    this.reset();
});

// Manejar formulario de factura
document.getElementById('form-factura').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nuevaFactura = {
        id_factura: document.getElementById('fact-id').value,
        proveedor: document.getElementById('fact-proveedor').value,
        monto: parseFloat(document.getElementById('fact-monto').value),
        categoria: document.getElementById('fact-categoria').value,
        deducible: document.getElementById('fact-deducible').checked
    };

    datos.facturas_gastos.push(nuevaFactura);
    actualizarDashboard();
    this.reset();
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatos);
