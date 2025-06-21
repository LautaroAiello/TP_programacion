Servicios
Hay varios servicios que pueden acceder sin autenticación, por ejemplo para registrar el usuario u obtener los productos
Luego para operaciones específicas como cargar un producto, crear una categoría, agregar un product al carrito, etc van a necesitar enviar en el header del servicio, un token
El token es un jwt que se debe enviar en el header como Authorization
El jwt se recibe en la respuesta del login en caso de ser exitoso y tiene un tiempo de expiración.
Los servicios que no necesitan de un token están aclarados en cada endpoint, si no dice nada es porque si es necesario enviar el token

* Login:

    . POST - /api/login (sin token)
        body:
        {
            usuario: string,
            password: string
        }
* Productos:
    . GET - /api/obtenerProductos (sin token)

    . POST - /api/crearCategoria
        body: 
        {
            nombre: string
        }

    . POST - /api/cargarProducto
        body:
        {
            nombre: string
            descripcion: string
            precio: number
            genero: string
            id_categoria: number
            imagen: string

        }
    .
* Usuarios:
    . POST - /api/registrarUsuario (sin token)
        body:
        {
            nombre: string
            apellido: string
            direccion: string
            email: string
            telefono: string
            rol: string
            password: password

        }
    . GET - /api/obtenerDatosUsuario/:id

    . POST - /api/modificarUsuario/:id
    body:
        {
            nombre: string
            apellido: string
            direccion: string
            email: string
            telefono: string
            rol: string
            password: password

        }
    

