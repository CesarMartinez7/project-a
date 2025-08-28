# project-A
python ft FastAPI


## API de logeo 

La API DE `login` nos permite generar una session vigente para hacer consultas en la base de datos

## Base url
http://127.0.0.1:8000/login



### Login

```json
{
  "username": "cesar",
  "email": "cesar@mail.com",
  "password": "123456"
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "Usuario logeado exitosamente"
}
```


## register

http://127.0.0.1:8000/register



```json
{
    "User_id": "0123456789",
    "User_name": "Name",
    "User_phone": "0123456789",
    "User_mail": "rgmail@.com",
    "User_password": "abcd123.*"
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "Usuario registrado exitosamente"
}
```


## actualizar usuario

http://127.0.0.1:8000/updateP

```json
{
    "User_id": "0123456789",
    "User_name": "Name",
    "User_phone": "0123456789",
    "User_mail": "rgmail@.com",
    "User_password": "abcd123.*"
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "Usuario actualizado exitosamente"
}
```
##  se pueden modificar datos los actualiza



## ver productos

http://127.0.0.1:8000/view_product

```json
{
    // ======== NO SE ENVIA NADA =========== 
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "Se muestra la lista de productos en forma de tabla"
}
```


## Agregar producto

http://127.0.0.1:8000/create_product

```json
{
    "Product_id": "123",
    "Product_name": "manzana",
    "Product_description": "verde, roja",
    "Cat_id": "comida",
    "Product_cant": "10",
    "Product_price": "$10.000" 
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "producto creado exitosamente"
}
```




## categoria

http://127.0.0.1:8000/category

```json
{
    "Cat_id": "123",
    "Cat_name": "aseo"
}
```
### Request Response
```json
{
  "statusCode": "200",
  "message": "categoria creada exitosamente"
}
```
