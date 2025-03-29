/**
 * Calcula el factorial de un número n
 * El factorial es el producto de todos los números enteros positivos desde 1 hasta n
 * Ejemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120
 */
function factorial(n) {
  if (n === 0 || n === 1) return 1; // Casos base: 0! = 1! = 1
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i; // Multiplica cada número desde 2 hasta n
  }
  return result;
}

/**
 * Calcula el número de combinaciones de n elementos tomados de k en k
 * La fórmula es: C(n,k) = n!/(k!(n-k)!)
 * Se usa una optimización para evitar calcular factoriales grandes:
 * C(n,k) = (n × (n-1) × ... × (n-k+1))/k!
 */
function combination(n, k) {
    if (k > n || k < 0) return { result: 0, steps: "Combinación no válida: k > n o k < 0" };
    
    // Optimización: usar el mínimo entre k y (n-k)
    k = Math.min(k, n - k);
    
    let result = 1;
    let steps = [];
    
    // Calcular la combinación usando multiplicación directa
    for (let i = 0; i < k; i++) {
        result *= (n - i) / (i + 1);
        steps.push(`C(${n},${k}) paso ${i + 1}: ${result.toFixed(6)}`);
    }
    
    return {
        result: result,
        steps: steps.join('<br>')
    };
}

/**
 * Calcula la probabilidad binomial P(X = k) en n ensayos con probabilidad p
 * Fórmula: P(X = k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
 * Donde:
 * - n: número total de ensayos
 * - k: número de éxitos deseados
 * - p: probabilidad de éxito en cada ensayo
 */
function binomialProbability(n, p, k) {
    const comb = combination(n, k);
    const pPower = Math.pow(p, k);
    const qPower = Math.pow(1 - p, n - k);
    const probability = comb.result * pPower * qPower;
    
    return {
        probability: probability,
        steps: {
            combination: comb.steps,
            finalCalculation: `${comb.result.toFixed(6)} × ${pPower.toFixed(6)} × ${qPower.toFixed(6)} = ${probability.toFixed(6)}`
        }
    };
}

/**
 * Calcula la probabilidad de Poisson P(X = k) con parámetro λ
 * Fórmula: P(X = k) = (λᵏ × e⁻ᵝ) / k!
 * Donde:
 * - λ (lambda): promedio de ocurrencias en el intervalo
 * - k: número de ocurrencias deseadas
 */
function poissonProbability(lambda, k) {
    const expLambda = Math.exp(-lambda); // e^-λ
    const lambdaPower = Math.pow(lambda, k); // λ^k
    const factorialK = factorial(k); // k!
    const probability = (lambdaPower * expLambda) / factorialK;
    
    return {
        probability: probability,
        steps: {
            lambdaPower: lambdaPower,
            expLambda: expLambda,
            factorial: factorialK,
            finalCalculation: `(${lambdaPower.toFixed(6)} × ${expLambda.toFixed(6)}) / ${factorialK} = ${probability.toFixed(6)}`
        }
    };
}

/**
 * Calcula la probabilidad hipergeométrica P(X = k)
 * Fórmula: P(X = k) = [C(K,k) × C(N-K,n-k)] / C(N,n)
 * Donde:
 * - N: tamaño de la población
 * - K: número de éxitos en la población
 * - n: tamaño de la muestra
 * - k: número de éxitos deseados en la muestra
 */
function hypergeometricProbability(N, K, n, k) {
    const comb1 = combination(K, k); // C(K,k)
    const comb2 = combination(N - K, n - k); // C(N-K,n-k)
    const comb3 = combination(N, n); // C(N,n)
    const probability = (comb1.result * comb2.result) / comb3.result;
    
    return {
        probability: probability,
        steps: {
            combinationK: comb1.steps,
            combinationNK: comb2.steps,
            combinationN: comb3.steps,
            finalCalculation: `(${comb1.result.toFixed(6)} × ${comb2.result.toFixed(6)}) / ${comb3.result.toFixed(6)} = ${probability.toFixed(6)}`
        }
    };
}

/**
 * Muestra la solución detallada para cada tipo de problema
 * Incluye:
 * - La fórmula utilizada
 * - Los pasos del cálculo
 * - Los resultados intermedios
 * - El resultado final
 */
function showSolution(type, params) {
    const solutionDiv = document.getElementById(`solution-${type}`);
    const button = solutionDiv.previousElementSibling;
    
    if (solutionDiv.style.display === 'block') {
        solutionDiv.style.display = 'none';
        button.textContent = 'Mostrar Solución';
        return;
    }

    let solution = '';
    let result;

    switch(type) {
        case 'binomial':
            const binomialParams = params;
            result = binomialProbability(binomialParams.n, binomialParams.p, binomialParams.k);
            
            solution = `
                <div class="solution-steps">
                    <div class="variables">
                        <h4>Variables:</h4>
                        <ul>
                            <li>n (número de ensayos) = ${binomialParams.n}</li>
                            <li>p (probabilidad de éxito) = ${binomialParams.p}</li>
                            <li>k (número de éxitos) = ${binomialParams.k}</li>
                        </ul>
                    </div>
                    
                    <div class="formula">
                        <h4>Fórmula:</h4>
                        <p>P(X = k) = C(n,k) × p^k × (1-p)^(n-k)</p>
                        <p><em>Esta fórmula nos permite calcular la probabilidad de obtener exactamente k éxitos en n ensayos independientes, donde cada ensayo tiene una probabilidad p de éxito.</em></p>
                    </div>

                    <div class="step">
                        <h4>Paso 1: Calcular la combinación C(n,k)</h4>
                        <p><em>Calculamos el número de formas diferentes en que podemos obtener k éxitos en n ensayos, sin importar el orden.</em></p>
                        ${result.steps.combination}
                    </div>

                    <div class="step">
                        <h4>Paso 2: Calcular p^k</h4>
                        <p><em>Calculamos la probabilidad de obtener éxito en los k ensayos específicos elevando p a la k.</em></p>
                        <p>p^k = ${binomialParams.p}^${binomialParams.k} = ${Math.pow(binomialParams.p, binomialParams.k).toFixed(6)}</p>
                    </div>

                    <div class="step">
                        <h4>Paso 3: Calcular (1-p)^(n-k)</h4>
                        <p><em>Calculamos la probabilidad de obtener fracaso en los restantes (n-k) ensayos elevando (1-p) a la (n-k).</em></p>
                        <p>(1-${binomialParams.p})^(${binomialParams.n}-${binomialParams.k}) = ${Math.pow(1-binomialParams.p, binomialParams.n-binomialParams.k).toFixed(6)}</p>
                    </div>

                    <div class="step">
                        <h4>Paso 4: Multiplicar todos los términos</h4>
                        <p><em>Multiplicamos los tres términos anteriores para obtener la probabilidad total del evento.</em></p>
                        <p>${result.steps.finalCalculation}</p>
                    </div>

                    <div class="final-result">
                        <h4>Resultado Final:</h4>
                        <p>La probabilidad es: ${(result.probability * 100).toFixed(4)}%</p>
                    </div>
                </div>
            `;
            break;
            
        case 'poisson':
            const poissonParams = params;
            result = poissonProbability(poissonParams.lambda, poissonParams.x);
            
            solution = `
                <div class="solution-steps">
                    <div class="variables">
                        <h4>Variables:</h4>
                        <ul>
                            <li>λ (lambda, promedio) = ${poissonParams.lambda}</li>
                            <li>x (número de ocurrencias) = ${poissonParams.x}</li>
                        </ul>
                    </div>
                    
                    <div class="formula">
                        <h4>Fórmula:</h4>
                        <p>P(X = x) = (e^-λ × λ^x) / x!</p>
                        <p><em>Esta fórmula calcula la probabilidad de que ocurran exactamente x eventos en un intervalo, cuando el promedio de ocurrencias es λ.</em></p>
                    </div>

                    <div class="step">
                        <h4>Paso 1: Calcular e^-λ</h4>
                        <p><em>Calculamos e elevado a la -λ, que representa la probabilidad base de la distribución de Poisson.</em></p>
                        <p>e^-${poissonParams.lambda} = ${Math.exp(-poissonParams.lambda).toFixed(6)}</p>
                    </div>

                    <div class="step">
                        <h4>Paso 2: Calcular λ^x</h4>
                        <p><em>Calculamos λ elevado a x, que representa la probabilidad de las x ocurrencias específicas.</em></p>
                        <p>${poissonParams.lambda}^${poissonParams.x} = ${Math.pow(poissonParams.lambda, poissonParams.x).toFixed(6)}</p>
                    </div>

                    <div class="step">
                        <h4>Paso 3: Calcular x!</h4>
                        <p><em>Calculamos el factorial de x, que normaliza la probabilidad considerando todas las posibles ordenaciones.</em></p>
                        <p>${poissonParams.x}! = ${factorial(poissonParams.x)}</p>
                    </div>

                    <div class="step">
                        <h4>Paso 4: Multiplicar y dividir los términos</h4>
                        <p><em>Multiplicamos e^-λ por λ^x y dividimos por x! para obtener la probabilidad final.</em></p>
                        <p>${result.steps.finalCalculation}</p>
                    </div>

                    <div class="final-result">
                        <h4>Resultado Final:</h4>
                        <p>La probabilidad es: ${(result.probability * 100).toFixed(4)}%</p>
                    </div>
                </div>
            `;
            break;
            
        case 'hypergeometric':
            const hyperParams = params;
            result = hypergeometricProbability(hyperParams.N, hyperParams.K, hyperParams.n, hyperParams.x);
            
            solution = `
                <div class="solution-steps">
                    <div class="variables">
                        <h4>Variables:</h4>
                        <ul>
                            <li>N (tamaño de la población) = ${hyperParams.N}</li>
                            <li>K (número de éxitos en la población) = ${hyperParams.K}</li>
                            <li>n (tamaño de la muestra) = ${hyperParams.n}</li>
                            <li>x (número de éxitos en la muestra) = ${hyperParams.x}</li>
                        </ul>
                    </div>
                    
                    <div class="formula">
                        <h4>Fórmula:</h4>
                        <p>P(X = x) = [C(K,x) × C(N-K,n-x)] / C(N,n)</p>
                        <p><em>Esta fórmula calcula la probabilidad de obtener x éxitos en una muestra de tamaño n, tomada de una población de tamaño N que contiene K éxitos totales.</em></p>
                    </div>

                    <div class="step">
                        <h4>Paso 1: Calcular C(K,x)</h4>
                        <p><em>Calculamos el número de formas de seleccionar x éxitos de los K éxitos disponibles en la población.</em></p>
                        ${result.steps.combinationK}
                    </div>

                    <div class="step">
                        <h4>Paso 2: Calcular C(N-K,n-x)</h4>
                        <p><em>Calculamos el número de formas de seleccionar los fracasos restantes (n-x) de los fracasos disponibles (N-K).</em></p>
                        ${result.steps.combinationNK}
                    </div>

                    <div class="step">
                        <h4>Paso 3: Calcular C(N,n)</h4>
                        <p><em>Calculamos el número total de formas posibles de seleccionar la muestra de tamaño n de la población total N.</em></p>
                        ${result.steps.combinationN}
                    </div>

                    <div class="step">
                        <h4>Paso 4: División final</h4>
                        <p><em>Dividimos el producto de las combinaciones superiores entre la combinación total para obtener la probabilidad.</em></p>
                        <p>${result.steps.finalCalculation}</p>
                    </div>

                    <div class="final-result">
                        <h4>Resultado Final:</h4>
                        <p>La probabilidad es: ${(result.probability * 100).toFixed(4)}%</p>
                    </div>
                </div>
            `;
            break;
    }
    
    solutionDiv.innerHTML = solution;
    solutionDiv.style.display = 'block';
    button.textContent = 'Ocultar Solución';
}

/**
 * Resuelve un ejercicio de distribución binomial
 * @param {number} n - Número total de ensayos
 * @param {number} p - Probabilidad de éxito en cada ensayo
 * @param {number} x - Número de éxitos deseados
 * @returns {Object} Resultado con la probabilidad y los pasos
 */
function resolverBinomial(n, p, x) {
  if (x > n) {
    return {
      error: 'El número de éxitos no puede ser mayor que el número de ensayos',
      formula: `P(X = ${x}) = C(${n},${x}) × ${p}^${x} × ${1 - p}^${n - x}`,
    };
  }

  const resultado = binomialProbability(n, x, p);
  return {
    formula: `P(X = ${x}) = C(${n},${x}) × ${p}^${x} × ${1 - p}^${n - x}`,
    pasos: {
      combinaciones: resultado.steps.combination,
      probabilidadExito: resultado.steps.pPower,
      probabilidadFracaso: resultado.steps.qPower,
    },
    resultado: resultado.probability,
  };
}

/**
 * Resuelve un ejercicio de distribución de Poisson
 * @param {number} lambda - Promedio de ocurrencias en el intervalo
 * @param {number} x - Número de ocurrencias deseadas
 * @returns {Object} Resultado con la probabilidad y los pasos
 */
function resolverPoisson(lambda, x) {
  const resultado = poissonProbability(lambda, x);
  return {
    formula: `P(X = ${x}) = (${lambda}^${x} × e^-${lambda}) / ${x}!`,
    pasos: {
      lambdaPotencia: resultado.steps.lambdaPower,
      exponencial: resultado.steps.expLambda,
      factorial: resultado.steps.factorial,
    },
    resultado: resultado.probability,
  };
}

/**
 * Resuelve un ejercicio de distribución hipergeométrica
 * @param {number} N - Tamaño de la población
 * @param {number} K - Número de éxitos en la población
 * @param {number} n - Tamaño de la muestra
 * @param {number} x - Número de éxitos deseados en la muestra
 * @returns {Object} Resultado con la probabilidad y los pasos
 */
function resolverHipergeometrica(N, K, n, x) {
  if (K > N) {
    return {
      error:
        'El número de éxitos en la población no puede ser mayor que el tamaño de la población',
      formula: `P(X = ${x}) = [C(${K},${x}) × C(${N - K},${
        n - x
      })] / C(${N},${n})`,
    };
  }
  if (n > N) {
    return {
      error:
        'El tamaño de la muestra no puede ser mayor que el tamaño de la población',
      formula: `P(X = ${x}) = [C(${K},${x}) × C(${N - K},${
        n - x
      })] / C(${N},${n})`,
    };
  }
  if (x > K || x > n) {
    return {
      error:
        'El número de éxitos deseados no puede ser mayor que los éxitos en la población o el tamaño de la muestra',
      formula: `P(X = ${x}) = [C(${K},${x}) × C(${N - K},${
        n - x
      })] / C(${N},${n})`,
    };
  }

  const resultado = hypergeometricProbability(N, K, n, x);
  return {
    formula: `P(X = ${x}) = [C(${K},${x}) × C(${N - K},${
      n - x
    })] / C(${N},${n})`,
    pasos: {
      combinacion1: resultado.steps.combinationK,
      combinacion2: resultado.steps.combinationNK,
      combinacion3: resultado.steps.combinationN,
    },
    resultado: resultado.probability,
  };
}

/**
 * Muestra la solución detallada de un ejercicio específico
 * @param {string} tipo - Tipo de distribución ('binomial', 'poisson', 'hipergeometrica')
 * @param {Object} parametros - Parámetros específicos para cada tipo
 */
function mostrarSolucionEjercicio(tipo, parametros) {
  let resultado;
  let solucionHTML = '';

  switch (tipo) {
    case 'binomial':
      resultado = resolverBinomial(parametros.n, parametros.p, parametros.x);
      if (resultado.error) {
        solucionHTML = `<p class="error">${resultado.error}</p>`;
      } else {
        solucionHTML = `
                    <p><strong>Fórmula:</strong> <span class="formula">${
                      resultado.formula
                    }</span></p>
                    <h4>Pasos:</h4>
                    <h5>1. Cálculo de combinaciones:</h5>
                    <p>${resultado.pasos.combinaciones.formula}</p>
                    <p>${resultado.pasos.combinaciones.explanation}</p>
                    <ul>
                        ${resultado.pasos.combinaciones.steps
                          .map(
                            (step) => `
                            <li>Paso ${step.i}: × ${step.factor.toFixed(
                              4
                            )} = ${step.currentResult.toFixed(4)}</li>
                        `
                          )
                          .join('')}
                    </ul>
                    <h5>2. Cálculo de probabilidades:</h5>
                    <ul>
                        <li>${parametros.p}^${
          parametros.x
        } = ${resultado.pasos.probabilidadExito.toFixed(4)}</li>
                        <li>${1 - parametros.p}^${
          parametros.n - parametros.x
        } = ${resultado.pasos.probabilidadFracaso.toFixed(4)}</li>
                    </ul>
                    <p><strong>Resultado final:</strong> ${resultado.resultado.toFixed(
                      4
                    )} (${(resultado.resultado * 100).toFixed(2)}%)</p>
                `;
      }
      break;

    case 'poisson':
      resultado = resolverPoisson(parametros.lambda, parametros.x);
      solucionHTML = `
                <p><strong>Fórmula:</strong> <span class="formula">${
                  resultado.formula
                }</span></p>
                <h4>Pasos:</h4>
                <ul>
                    <li>${parametros.lambda}^${parametros.x} = ${
        resultado.steps.lambdaPower
      }</li>
                    <li>e^-${
                      parametros.lambda
                    } ≈ ${resultado.steps.expLambda.toFixed(4)}</li>
                    <li>${parametros.x}! = ${resultado.steps.factorial}</li>
                </ul>
                <p><strong>Resultado:</strong> ${resultado.resultado.toFixed(
                  4
                )} (${(resultado.resultado * 100).toFixed(2)}%)</p>
            `;
      break;

    case 'hipergeometrica':
      resultado = resolverHipergeometrica(
        parametros.N,
        parametros.K,
        parametros.n,
        parametros.x
      );
      if (resultado.error) {
        solucionHTML = `<p class="error">${resultado.error}</p>`;
      } else {
        solucionHTML = `
                    <p><strong>Fórmula:</strong> <span class="formula">${
                      resultado.formula
                    }</span></p>
                    <h4>Pasos:</h4>
                    
                    <h5>1. Cálculo de C(${parametros.K},${parametros.x}):</h5>
                    <p>${resultado.pasos.combinacion1.formula}</p>
                    <p>${resultado.pasos.combinacion1.explanation}</p>
                    <ul>
                        ${resultado.pasos.combinacion1.steps
                          .map(
                            (step) => `
                            <li>Paso ${step.i}: × ${step.factor.toFixed(
                              4
                            )} = ${step.currentResult.toFixed(4)}</li>
                        `
                          )
                          .join('')}
                    </ul>
                    
                    <h5>2. Cálculo de C(${parametros.N - parametros.K},${
          parametros.n - parametros.x
        }):</h5>
                    <p>${resultado.pasos.combinacion2.formula}</p>
                    <p>${resultado.pasos.combinacion2.explanation}</p>
                    <ul>
                        ${resultado.pasos.combinacion2.steps
                          .map(
                            (step) => `
                            <li>Paso ${step.i}: × ${step.factor.toFixed(
                              4
                            )} = ${step.currentResult.toFixed(4)}</li>
                        `
                          )
                          .join('')}
                    </ul>
                    
                    <h5>3. Cálculo de C(${parametros.N},${parametros.n}):</h5>
                    <p>${resultado.pasos.combinacion3.formula}</p>
                    <p>${resultado.pasos.combinacion3.explanation}</p>
                    <ul>
                        ${resultado.pasos.combinacion3.steps
                          .map(
                            (step) => `
                            <li>Paso ${step.i}: × ${step.factor.toFixed(
                              4
                            )} = ${step.currentResult.toFixed(4)}</li>
                        `
                          )
                          .join('')}
                    </ul>
                    
                    <p><strong>Resultado final:</strong> ${resultado.resultado.toFixed(
                      4
                    )} (${(resultado.resultado * 100).toFixed(2)}%)</p>
                `;
      }
      break;
  }

  // Crear un nuevo div para mostrar la solución
  const solucionDiv = document.createElement('div');
  solucionDiv.className = 'solucion-ejercicio';
  solucionDiv.innerHTML = solucionHTML;

  // Agregar la solución al contenedor principal
  document.querySelector('.container').appendChild(solucionDiv);
}

function calcularBinomial() {
    const n = parseInt(document.getElementById('num-ensayos').value);
    const p = parseFloat(document.getElementById('prob-exito').value) / 100;
    const k = parseInt(document.getElementById('num-exitos').value);

    // Validaciones
    if (k > n) {
        alert('El número de éxitos no puede ser mayor que el número de ensayos');
        return;
    }
    if (p < 0 || p > 1) {
        alert('La probabilidad debe estar entre 0 y 100%');
        return;
    }

    showSolution('binomial', {n: n, p: p, k: k});
}

function calcularPoisson() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const x = parseInt(document.getElementById('ocurrencias').value);

    // Validaciones
    if (lambda < 0) {
        alert('El promedio debe ser un número positivo');
        return;
    }
    if (x < 0) {
        alert('El número de ocurrencias debe ser un número positivo');
        return;
    }

    showSolution('poisson', {lambda: lambda, x: x});
}

function calcularHipergeometrica() {
    const N = parseInt(document.getElementById('total-poblacion').value);
    const K = parseInt(document.getElementById('exitos-poblacion').value);
    const n = parseInt(document.getElementById('tamano-muestra').value);
    const x = parseInt(document.getElementById('exitos-muestra').value);

    // Validaciones
    if (K > N) {
        alert('El número de bolas rojas no puede ser mayor que el total de bolas');
        return;
    }
    if (n > N) {
        alert('El tamaño de la muestra no puede ser mayor que el total de bolas');
        return;
    }
    if (x > K || x > n) {
        alert('El número de éxitos deseados no puede ser mayor que el número de bolas rojas o el tamaño de la muestra');
        return;
    }

    showSolution('hypergeometric', {N: N, K: K, n: n, x: x});
}

// Agregar validaciones para los inputs
document.addEventListener('DOMContentLoaded', function() {
    // Binomial
    document.getElementById('num-exitos').addEventListener('input', function() {
        const n = parseInt(document.getElementById('num-ensayos').value);
        if (parseInt(this.value) > n) {
            this.value = n;
        }
    });

    // Hipergeométrica
    document.getElementById('exitos-poblacion').addEventListener('input', function() {
        const N = parseInt(document.getElementById('total-poblacion').value);
        if (parseInt(this.value) > N) {
            this.value = N;
        }
    });

    document.getElementById('tamano-muestra').addEventListener('input', function() {
        const N = parseInt(document.getElementById('total-poblacion').value);
        if (parseInt(this.value) > N) {
            this.value = N;
        }
    });

    document.getElementById('exitos-muestra').addEventListener('input', function() {
        const K = parseInt(document.getElementById('exitos-poblacion').value);
        const n = parseInt(document.getElementById('tamano-muestra').value);
        const maxExitos = Math.min(K, n);
        if (parseInt(this.value) > maxExitos) {
            this.value = maxExitos;
        }
    });
});
