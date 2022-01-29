# Nest.js API Superflights

Proyecto de curso de Nest.js.

## Crear base de datos Mongo

Correr en la terminal  
docker-compose up -d  
Se creará un contendor llamado "mongo" con un user y password "demo".

## Troubleshooting

En caso de no conectar a BD Mongo por error "options usecreateindex, usefindandmodify are not supported" eliminar opciones useCreateIndex y useFindAndModify de MongooseModule en app.module.ts.
