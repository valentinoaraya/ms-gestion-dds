import http from 'k6/http';
import { Trend, Counter } from 'k6/metrics';
import { check, sleep } from 'k6';
import { exec } from 'k6/execution';

const statusTrend = new Trend('status_codes');
const responseTrend = new Trend('response_time_ms');
const successCounter = new Counter('successful_requests');
const errorCounter = new Counter('error_requests');

export const options = {
    stages: [
        { duration: "10s", target: 100 },
        { duration: "20s", target: 100 },
        { duration: "10s", target: 0 },
    ],
    thresholds: {
        // Criterios de éxito/fallo del test
        http_req_duration: ['p(95)<500'],    // 95% de requests < 500ms
        http_req_failed: ['rate<0.1'],       // Menos del 10% de errores
        'successful_requests': ['count>5000'], // Al menos 5000 requests exitosos
    },
    // Ignorar verificación de certificados SSL (desarrollo)
    insecureSkipTLSVerify: true,
};


export function setup() {
    console.log('\n Ejecutando seed de la base de datos...\n');
    return { timestamp: Date.now() };
}

export function teardown(data) {
    console.log('\n Limpiando base de datos...\n');
    console.log(`⏱️  Test duró: ${((Date.now() - data.timestamp) / 1000).toFixed(2)} segundos\n`);
    
}

export default function () {
    
    const BASE_URL = 'https://academica.universidad.localhost/api/especialidad';

    const especialidadIds = [1,2,3,4,5,6,7,8,9,10];
    const nonExistentIds = [999,1000,1001];

    //80% existentes, 20% no existentes 
    const allIds = Math.random() < 0.8 ? especialidadIds : nonExistentIds;
    const randomId = allIds[Math.floor(Math.random() * allIds.length)];

    const res = http.get(`${BASE_URL}/${randomId}`);

    responseTrend.add(res.timings.duration);
    statusTrend.add(res.status);
    
     
    // Validaciones
    const isSuccess = check(res, {
        'status is 200 or 404': (r) => [200, 404].includes(r.status),
        'no server errors (5xx)': (r) => r.status < 500,
        'response time < 1s': (r) => r.timings.duration < 1000,
        'response has body': (r) => r.body && r.body.length > 0,
        
        'response is valid JSON': (r) => {
            if (r.status !== 200) return true;
            try {
                const body = JSON.parse(r.body);
                return (
                    typeof body.especialidad === 'string' &&
                    typeof body.facultad === 'string' &&
                    typeof body.universidad === 'string'
                );
            } catch (e) {
                return false;
            }
        },
    });
    
    if (isSuccess) {
        successCounter.add(1);
    } else {
        errorCounter.add(1);
        console.log(`❌ Error: ID=${randomId}, status=${res.status}, time=${res.timings.duration.toFixed(2)}ms`);
    }
    
    // Simular tiempo de usuario 
    sleep(Math.random() * 2 + 1);
}
