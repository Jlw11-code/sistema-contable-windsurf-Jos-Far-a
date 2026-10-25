# Sistema Contable - Dashboard Financiero

Aplicación web interactiva para la gestión contable de nómina, retenciones y auditoría de gastos con cálculos automáticos según normativa fiscal.

## 📋 Descripción

Sistema contable desarrollado en 3 capas (HTML, CSS, JavaScript) que permite gestionar empleados, calcular nómina con retenciones legales, y auditar gastos con determinación de deducciones fiscales e impuestos estimados.

## ✨ Características Principales

### Módulo de Nómina y Retenciones
- Cálculo automático de valor de horas extras (1.5x sobre tarifa base)
- Retención de Seguro Social (4% sobre salario base)
- Retención de Impuesto sobre la Renta (ISLR 10% para salarios > $1000)
- Cálculo de salario neto a pagar

### Módulo de Auditoría de Gastos
- Cálculo de total de gastos brutos
- Identificación de deducciones fiscales permitidas
- Estimación de IVA (16% sobre gastos no deducibles)
- Estimación de ISLR corporativo (15% sobre utilidad bruta)

### Dashboard Interactivo
- 3 KPIs en tiempo real: Total Nómina Neta, Total Deducciones, Impuesto Estimado
- Tablas dinámicas con desglose detallado
- Formularios para agregar empleados y facturas
- Actualización automática de todos los cálculos

## 📁 Estructura del Proyecto

```
sistema-contable-windsurf-[José Faría]/
├── index.html              # Estructura principal de la aplicación
├── style.css               # Estilos y diseño visual
├── app.js                  # Lógica de negocio y cálculos
├── datos_financieros.json  # Datos iniciales de empleados y facturas
└── README.md              # Documentación del proyecto
```

## 🧮 Reglas de Negocio Implementadas

### Cálculos de Nómina

1. **Valor de Hora Extra**
   ```
   Valor = (Salario Base / 160) × 1.5 × Horas Extras Trabajadas
   ```

2. **Retención Seguro Social / Aportes Ley**
   ```
   Retención = Salario Base × 4%
   ```

3. **Retención ISLR (Impuesto sobre la Renta)**
   ```
   Si Salario Base > $1000:
       Retención = Salario Base × 10%
   Si no:
       Retención = $0
   ```

4. **Salario Neto a Pagar**
   ```
   Salario Neto = Salario Base + Valor Horas Extras - Retenciones Totales
   ```

### Cálculos de Auditoría Fiscal

1. **Total Gastos Brutos**
   ```
   Suma de todas las facturas de gastos
   ```

2. **Total Deducciones Fiscales**
   ```
   Suma de facturas marcadas como deducible: true
   ```

3. **Estimación de Impuesto a Pagar**
   ```
   IVA = (Gastos No Deducibles) × 16%
   ISLR Corporativo = (Utilidad Bruta Estimada) × 15%
   Impuesto Total = IVA + ISLR Corporativo
   ```

## 🚀 Cómo Usar

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional, para cargar datos JSON correctamente)

### Instalación y Ejecución

#### Opción 1: Abrir directamente (con datos de respaldo)
1. Abre el archivo `index.html` en tu navegador
2. La aplicación cargará datos de ejemplo si no puede leer el JSON

#### Opción 2: Con servidor local (recomendado)
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (requiere http-server instalado)
npx http-server
```

Luego abre `http://localhost:8000` en tu navegador.

### Uso de la Aplicación

1. **Ver KPIs**: Los indicadores clave se muestran en la parte superior
2. **Consultar Tablas**: 
   - Revisa el Resumen de Nómina con cálculos detallados por empleado
   - Consulta la Auditoría de Gastos con categorización
3. **Agregar Empleado**:
   - Completa el formulario con nombre, cargo, salario base y horas extras
   - Haz clic en "Agregar Empleado"
   - La tabla y KPIs se actualizan automáticamente
4. **Agregar Factura**:
   - Completa el formulario con ID, proveedor, monto y categoría
   - Marca "Deducible Fiscal" si aplica
   - Haz clic en "Agregar Factura"
   - Los cálculos fiscales se actualizan instantáneamente

## 📊 Datos de Ejemplo

La aplicación incluye datos iniciales en `datos_financieros.json`:

### Empleados
- Carlos Mendoza - Analista Financiero - $1200 - 8 horas extras
- María Rodríguez - Gerente de Operaciones - $2500 - 2 horas extras
- Alejandro Silva - Asistente Administrativo - $800 - 15 horas extras

### Facturas de Gastos
- F-001: Suministros Oficina C.A. - $450.00 - Deducible
- F-002: Servicios de Catering S.A. - $1200.00 - No deducible
- F-003: Equipos Tecnológicos R.L. - $850.00 - Deducible

## 🎨 Características de Diseño

- Interfaz moderna con gradientes púrpura/azul
- Diseño responsive adaptativo
- Tablas con filas hover para mejor legibilidad
- KPIs destacados con colores corporativos
- Formularios intuitivos con validación

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos y diseño responsive
- **JavaScript (ES6+)**: Lógica de negocio y manipulación DOM
- **JSON**: Almacenamiento de datos

## 📝 Notas Importantes

- Los cálculos de utilidad bruta estimada usan un margen del 30% como referencia
- La aplicación actualiza los cálculos en tiempo real al agregar nuevos registros
- Los datos no persisten al recargar la página (usa datos del JSON inicial)
- Para persistencia de datos, se requiere implementar almacenamiento local o backend

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la materia "Bases de la Programación e Informática".

## 👨‍💻 Autor

José Faría
Unidad 5 - Bases de la Programación e Informática
