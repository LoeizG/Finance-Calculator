const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/src/views/admin/balance', (req, res) => {
  const jsonData = req.body; // Datos calculados del cliente
  const filePath = 'src/views/admin/balance/variables/tableDataPasivos.json'; // Ruta al archivo JSON existente

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error al sobrescribir el archivo:', err);
      res.status(500).json({ error: 'Error al sobrescribir el archivo' });
    } else {
      console.log('Archivo JSON sobrescrito con éxito.');
      res.status(200).json({ message: 'Archivo JSON sobrescrito con éxito' });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor Node.js en ejecución en el puerto 3001');
});