const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de Supabase
const SUPABASE_URL = 'imitebaejlmvvzjczafg'; 
const SUPABASE_KEY = 'sb_publishable_CKTP5AbuQU0QTKyS_c268w_aj33-KI1'; 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname))); 

// Ruta principal para enviar la web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// RUTA 1: Registrar Solicitud de Acceso
app.post('/request-access', async (req, res) => {
    const { name, email, instagram, message } = req.body;
    if (!email) return res.status(400).json({ error: 'El correo es obligatorio.' });

    try {
        const { data, error } = await supabase
            .from('solicitudes_acceso')
            .insert([{ nombre: name, email: email, instagram: instagram, mensaje: message }]);

        if (error) throw error;
        return res.status(200).json({ success: true, message: 'Guardado en Supabase.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al guardar.' });
    }
});

// RUTA 2: Registrar Envío de Invitación
app.post('/send-invite', async (req, res) => {
    const { inviteEmail, inviteCode } = req.body;
    try {
        const { data, error } = await supabase
            .from('invitaciones_enviadas')
            .insert([{ email_invitado: inviteEmail, codigo_invitacion: inviteCode }]);

        if (error) throw error;
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Error.' });
    }
});

// RUTA 3: Iniciar Sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase
            .from('solicitudes_acceso')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) return res.status(401).json({ error: 'No registrado.' });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);
});