## 📊 Análisis del Microservicio y Mejoras Propuestas

Se realizó un análisis de rendimiento del microservicio mediante un Spike Test con k6, simulando un escenario de carga pico con hasta 100 usuarios virtuales durante 40 segundos. El objetivo fue evaluar estabilidad, latencia, throughput y resistencia ante cargas abruptas.

### 🧪 Resultados del Spike Test

Los resultados principales fueron los siguientes:

- **Requests procesados:** 7695
- **Errores:** 0% (http_req_failed = 0.00%)
- **Latencia promedio:** 4.71 ms
- **p(95) de latencia:** 8.01 ms
- **Latencia máxima:** 45 ms
- **Throughput:** 36.57 requests/seg
- **Checks totales:** 7695 (100% exitosos)
- **Status Codes:** 200 en todas las respuestas válidas

Imagen de los Resultados
![Resultados K6](/k6/Mediciones%20K6.jpg)

Todas las condiciones del test fueron cumplidas:

- `http_req_duration: p(95)<500` → ✔️ 8 ms
- `http_req_failed: rate<0.1` → ✔️ 0%
- `successful_requests: count>400` → ✔️ 1539

### ✔️ Conclusiones del test

El microservicio mostró:

- **Excelente tiempo de respuesta**, con picos menores a 50 ms incluso bajo carga máxima.
- **Estabilidad total**, sin fallas de servidor ni tiempos de espera.
- **Muy buena escalabilidad**, sin señales de saturación.
- **Respuestas consistentes**, sin variaciones anómalas en los endpoints testeados.

El diseño actual está preparado para operar correctamente dentro de una arquitectura de microservicios con tráfico alto o variable.

### 🚀 Mejora Propuesta: Implementación de Rate Limit

Aunque el rendimiento es sólido, existe una mejora importante recomendada para un entorno de microservicios real:

#### 🔒 Implementar un Rate Limit por IP o por ruta crítica

El microservicio no cuenta actualmente con limitación de peticiones por segundo, lo que puede permitir:

- Ataques de flooding o consumo excesivo del endpoint
- Mal uso accidental desde un microservicio externo
- Saturación de PostgreSQL o Redis bajo cargas sostenidas

#### 🎯 Recomendación práctica

Agregar un middleware de Rate Limiting ligero, por ejemplo:

- **express-rate-limit** en Node.js
- **Límite sugerido:** 30–60 requests por minuto por IP, ajustable según entorno
- **Aplicar solo en rutas críticas** como consultas masivas
- **Excluir** `/health` y endpoints internos

Esto permitiría:

- Proteger la base de datos
- Evitar sobrecargas accidentales
- Mejorar la resiliencia total del sistema
- Alinearse con los patrones de microservicios solicitados (Rate Limit)

### 🔢 Recomendación: Cálculo de Réplicas Necesarias

Basándose en los resultados del spike test, es posible calcular cuántas réplicas son necesarias para soportar una carga específica:

#### Capacidad por instancia

El test mostró que cada instancia puede procesar aproximadamente:
- **36 req/s por instancia**

#### Ejemplo de cálculo

Si necesitas soportar **100 req/s**, el cálculo es:

```
100 req/s ÷ 36 req/s = 2.7 → 3 réplicas
```

#### Fórmula general

```
Número de réplicas = Carga objetivo (req/s) ÷ 36 req/s
```

Siempre redondea hacia arriba para tener un margen de seguridad.

Este análisis basado en datos empíricos facilita la justificación del número de réplicas en la configuración de producción y permite dimensionar correctamente la infraestructura según las necesidades de tráfico esperadas.