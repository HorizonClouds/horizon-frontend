const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta 'dist/horizon-frontend/browser' (o donde tengas los archivos estáticos)
app.use(express.static(path.join(__dirname, 'dist/horizon-frontend/browser')));

// Redirigir todas las peticiones al index.html que está en 'dist/horizon-frontend/server'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/horizon-frontend/server/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
