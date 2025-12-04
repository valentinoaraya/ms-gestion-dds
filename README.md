# Variables de entorno:

## .env.development:

```bash
PORT=5003

DATABASE_URL="postgresql://anfatitofa:fatotifaan1504141503@localhost:3000/sysacad_db"
POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

REDIS_URL="redis://localhost:6380"
```

## .env.production:
```bash
PORT=5003

POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

REDIS_PORT=6379
REDIS_HOST=redis-servidor

DOCUMENTOS_HOST=ms-documentos

REDIS_URL="redis://redis-servidor:6379"
```
## Para correr los test

```bash
export $(cat .env.development | xargs)
npm test
```
