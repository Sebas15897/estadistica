# Calculadora de Distribuciones de Probabilidad

Esta aplicación web permite calcular y visualizar paso a paso las probabilidades para tres tipos diferentes de distribuciones: Binomial, Poisson e Hipergeométrica.

## Características

- Interfaz interactiva con inputs dinámicos
- Cálculos paso a paso con explicaciones detalladas
- Validación de inputs en tiempo real
- Visualización clara de fórmulas y resultados
- Soporte para tres distribuciones de probabilidad

## Distribuciones Incluidas

### 1. Distribución Binomial
- Calcula la probabilidad de obtener exactamente k éxitos en n ensayos independientes
- Variables:
  - n: número de ensayos
  - p: probabilidad de éxito
  - k: número de éxitos deseados

### 2. Distribución de Poisson
- Calcula la probabilidad de que ocurran exactamente k eventos en un intervalo
- Variables:
  - λ (lambda): promedio de ocurrencias
  - k: número de ocurrencias deseadas

### 3. Distribución Hipergeométrica
- Calcula la probabilidad de obtener k éxitos en una muestra sin reposición
- Variables:
  - N: tamaño de la población
  - K: número de éxitos en la población
  - n: tamaño de la muestra
  - x: número de éxitos deseados

## Funcionalidades

- **Cálculo Paso a Paso**: Cada solución muestra:
  - Variables utilizadas
  - Fórmula aplicada
  - Pasos intermedios del cálculo
  - Resultado final en formato decimal y porcentaje

- **Validaciones**:
  - Comprobación de valores válidos para cada distribución
  - Límites automáticos en inputs numéricos
  - Alertas para valores inválidos

- **Interfaz Responsiva**:
  - Diseño limpio y organizado
  - Secciones colapsables para cada distribución
  - Botones para mostrar/ocultar soluciones

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

## Estructura del Proyecto
