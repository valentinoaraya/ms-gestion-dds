# Variables de entorno:

## .env.development:

PORT=5003
NODE_ENV=development

DATABASE_URL="postgresql://anfatitofa:fatotifaan1504141503@localhost:3000/sysacad_db?schema=public"

POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

## .env.production:

PORT=5003
NODE_ENV=production

POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

DATABASE_URL="postgresql://anfatitofa:fatotifaan1504141503@postgresql-servidor:5432/sysacad_db?schema=public"

REDIS_URL="redis://redis-servidor:6379"
