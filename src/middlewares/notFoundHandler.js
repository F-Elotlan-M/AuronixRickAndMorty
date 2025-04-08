// Middleware para manejar rutas no encontradas
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      error: 'Not Found',
      message: 'The endpoint you are trying to access does not exist.',
    });
  };
  
  export default notFoundHandler;
  