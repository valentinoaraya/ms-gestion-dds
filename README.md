# Variables de entorno:

Hay que tener tres .env:
- .env
- .env.development
- .env.production

## .env.development
```bash
PORT=5003
NODE_ENV=development

DATABASE_URL=postgresql://anfatitofa:fatotifaan1504141503@localhost:3000/sysacad_db?schema=public
POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

REDIS_URL=redis://:antitofaredis@localhost:6380
```

## .env.production
```bash
PORT=5003
NODE_ENV=production

POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

DATABASE_URL=postgresql://anfatitofa:fatotifaan1504141503@postgresql:5432/sysacad_db?schema=public

REDIS_URL=redis://:antitofaredis@redis:6379
```

## ¿Cuándo usar cuál?
Para testing y desarrollo copiar contenido de .env.development y pegarlo en .env.
Para levantar la aplicación copiar contenido de .env.production luego levantar la app.