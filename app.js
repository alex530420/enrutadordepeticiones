import path from "path";
import { promises as fs } from 'fs';


export default async (req, res) => {
    // Desestructurando de "req"
    let { url, method } = req;
  
    console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);
  
    // Enrutando peticiones
    switch (url) {
      case '/':
        const indexPath = path.join(__dirname, 'views/index.html');
          const dataindex = await fs.readFile(indexPath);
          res.setHeader('Content-Type', 'text/html');
          res.write(dataindex);
        
        break;
  
        // Actividad Enrutado
      case '/author':
        const authorPath = path.join(__dirname, 'views/author.html');
          const datauth = await fs.readFile(authorPath);
          res.setHeader('Content-Type', 'text/html');
          res.write(datauth);
        
        res.setHeader('Content-Type', 'text/html');
        let url_image = 'https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
        res.write(`
        
        `);
        console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 200;
        // Cerrando la comunicacion
        res.end();
        break;
  
        // Actividad Favicon
      case "/favicon.ico":
        // Especificar la ubicación del archivo de icono
        const faviconPath = path.join(__dirname, 'favicon.ico');
        try{
          const data = await fs.readFile(faviconPath);
          res.writeHead(200, {'Content-Type': 'image/x-icon'});
          res.end(data);
        }catch (err) {
          console.error(err);
          // Peticion raiz
          // Estableciendo cabeceras
          res.setHeader('Content-Type', 'text/html');
          // Escribiendo la respuesta
          res.write(``);
          console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
          console.log(`📣 ERROR: 500 ${err.message}`);
          // Estableciendo codigo de respuesta
          res.statusCode = 500;
          // Cerrando la comunicacion
          res.end();
        }
        break
      case "/message":
        const error404Path = path.join(__dirname, 'views/404.html');
          const data404 = await fs.readFile(error404Path);
          res.setHeader('Content-Type', 'text/html');
          res.write(data404);
        
        
        
        // Verificando si es post
        if (method === "POST") {
            // Se crea una variable para almacenar los
            // Datos entrantes del cliente
            let body = "";
            // Se registra un manejador de eventos
            // Para la recepción de datos
            req.on("data", (data => {
              body += data;
              if (body.length > 1e6) return req.socket.destroy();
            }));
            // Se registra una manejador de eventos
            // para el termino de recepción de datos
            req.on("end",  () => {
              // Procesa el formulario
            
              // Mediante URLSearchParams se extraen
              // los campos del formulario
              const params = new URLSearchParams(body);
              // Se construye un objeto a partir de los datos
              // en la variable params
              const parsedParams = Object.fromEntries(params);
              //Almacenar el mensaje en un archivo
               fs.writeFile('message.txt',parsedParams.message);
              
            })
            //Establecer codigo de respuesta para redireccionamiento
            res.statusCode=302;
            //estableciendo el redireccionamiento
            res.setHeader('Location','/');
  
            // Se finaliza la conexion
            return res.end();
            
          } else {
            res.statusCode = 404;
            res.write("404: Endpoint no encontrado")
            res.end();
          }
          break;
      default:
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(`
       
        `);
        console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 404;
        // Cerrando la comunicacion
        res.end();
        break;
    }
  }; 