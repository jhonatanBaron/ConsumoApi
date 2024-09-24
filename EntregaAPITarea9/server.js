const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Hacemos la carpeta public accesible desde el navegador
app.use(express.static('public'));

// Ruta que maneja la petición desde el frontend
app.get('/api/combined', async (req, res) => {
    try {
        // Consultamoslos  detalles de un pokemon
        const pokemonRequest = axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');

        // Consultamos los tipos de pokemon
        const typesRequest = axios.get('https://pokeapi.co/api/v2/type');

        // Esperamos ambas respuestas
        const [pokemonResponse, typesResponse] = await Promise.all([pokemonRequest, typesRequest]);

        // Combinamos las respuestas
        const combinedData = {
            pokemon: pokemonResponse.data,
            types: typesResponse.data,
        };

        // Enviamos la respuesta combinada al frontend
        res.json(combinedData);
    } catch (error) {
        console.error('Error al consultar las APIs:', error);
        res.status(500).json({ error: 'Error al consultar las APIs' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
