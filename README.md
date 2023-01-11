# kukos_server
<h2>API de gestión de usuarios con Node.js y Express</h2>
<h3>Endpoints</h3>
<h4>GET /getUserById</h4>
<p>Este endpoint se utiliza para obtener un usuario específico en función de su ID.</p>
<p>Se debe pasar el ID del usuario en el querystring con la clave "_id".</p>
<p>Ejemplo de uso: <code>/getUserById?_id=5f6c8f6d8a6f9f9a9a9a9a9a</code></p>
<p>En caso de éxito, se devolverá el usuario en cuestión en formato JSON.</p>
<h4>POST /login</h4>
<p>Este endpoint se utiliza para iniciar sesión en la aplicación.</p>
<p>Se deben pasar las credenciales del usuario (email y password) en el body en formato JSON.</p>
<p>Ejemplo de uso:</p>
<pre>
{
    "email": "example@example.com",
    "password": "password123"
}
</pre>
<p>En caso de éxito, se devolverá el usuario correspondiente en formato JSON.</p>
<br>
<h4>POST /register</h4>
<p>Este endpoint se utiliza para registrar un nuevo usuario en la aplicación.</p>
<p>Se deben pasar los datos del usuario (nombre, email, password) en el body en formato JSON.</p>
<p>Ejemplo de uso:</p>
<pre>
{
    "nombre": "Juan Pérez",
    "email": "example@example.com",
    "password": "password123"
}
</pre>
<p>En caso de éxito, se devolverá el usuario registrado en formato JSON con su ID asignado.</p>
<br>
<h4>PUT /updateLastRule</h4>
<p>Este endpoint se utiliza para actualizar la fecha de última conexión de un usuario.</p>
<p>Se debe pasar el ID del usuario en el body en formato JSON.</p>
<p>Ejemplo de uso:</p>
<pre>
{
    "_id": "5f6c8f6d8a6f9f9a9a9a9a9a"
}
</pre>
<p>En caso de éxito, se devolverá la información actualizada del usuario en formato JSON.</p>
<br>
<h4>POST /saveMovie</h4>
<p>Este endpoint se utiliza para guardar o borrar una pelicula de un usuario.</p>
<p>Se debe pasar el ID del usuario y el ID de la pelicula en el body en formato JSON.</p><p>Ejemplo de uso:</p>
<pre>
{
    "_id": "5f6c8f6d8a6f9f9a9a9a9a9a",
    "idMovie": "5f6c8f6d8a6f9f9a9a9a9b9b"
}
</pre>
<p>En caso de éxito, se devolverá la información actualizada del usuario en formato JSON.</p>
<br>
<h4>PUT /addPoints</h4>
<p>Este endpoint se utiliza para aumentar los puntos de un usuario específico en función de su ID.</p>
<p>Se deben pasar el ID del usuario y los puntos a aumentar en el body en formato JSON.</p>
<p>Ejemplo de uso:</p>
<pre>
{
    "_id": "5f6c8f6d8a6f9f9a9a9a9a9a",
    "points": 10
}
</pre>
<p>En caso de éxito, se devolverá el usuario con sus puntos actualizados en formato JSON.</p>
<br>
<h4>PUT /decPoints</h4>
<p>Este endpoint se utiliza para disminuir los puntos de un usuario específico en función de su ID.</p>
<p>Se deben pasar el ID del usuario y los puntos a disminuir en el body en formato JSON.</p>
<p>Ejemplo de uso:</p>
<pre>
{
    "_id": "5f6c8f6d8a6f9f9a9a9a9a9a",
    "points": 10
}
</pre>
<p>En caso de éxito, se devolverá el usuario con sus puntos actualizados en formato JSON.</p>