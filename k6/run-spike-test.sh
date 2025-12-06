#!/bin/bash

# 🎯 Script para ejecutar spike test con seed y limpieza automática
# Uso: ./k6/run-spike-test.sh

set -e  # Detener si hay error

echo "📦 Directorio de trabajo: $(pwd)"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para manejar errores
trap 'echo -e "${RED}❌ Error: El script falló en la línea $LINENO${NC}"; exit 1' ERR

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   🚀 SPIKE TEST - Setup Automático${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Paso 1: Limpiar base de datos (por si tiene datos anteriores)
echo -e "${YELLOW}🧹 Paso 1/4: Limpiando base de datos...${NC}"
npm run clear-database
echo -e "${GREEN}✅ Base de datos limpiada${NC}"
echo ""

# Paso 2: Poblar base de datos con datos de prueba
echo -e "${YELLOW}🌱 Paso 2/4: Poblando base de datos con datos de prueba...${NC}"
npm run seed-database
echo -e "${GREEN}✅ Base de datos poblada (10 especialidades creadas)${NC}"
echo ""

# Paso 3: Ejecutar spike test de K6
echo -e "${YELLOW}⚡ Paso 3/4: Ejecutando spike test...${NC}"
echo -e "${BLUE}───────────────────────────────────────────────────────────${NC}"
k6 run k6/spike_test.js
SPIKE_EXIT_CODE=$?
echo -e "${BLUE}───────────────────────────────────────────────────────────${NC}"

if [ $SPIKE_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Spike test completado exitosamente${NC}"
else
    echo -e "${RED}❌ Spike test falló con código de salida: $SPIKE_EXIT_CODE${NC}"
fi
echo ""

# Paso 4: Limpiar base de datos después del test
echo -e "${YELLOW}🧹 Paso 4/4: Limpiando base de datos...${NC}"
npm run clear-database
echo -e "${GREEN}✅ Base de datos limpiada${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   ✨ Proceso completado${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Salir con el código de K6 (para CI/CD)
exit $SPIKE_EXIT_CODE
