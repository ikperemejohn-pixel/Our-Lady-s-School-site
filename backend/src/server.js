require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const http = require('http');
const socketio = require('socket.io');

const authRoutes = require('./routes/auth');
const resultRoutes = require('./routes/results');
const reportRoutes = require('./routes/reports');
const termiiRoutes = require('./routes/termii');

const prisma = new PrismaClient();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api/health', (req,res)=> res.json({status:'ok'}));

app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/reports', reportRoutes);
app.use('/webhook/termii', termiiRoutes);

const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: '*' } });
app.set('io', io);

io.on('connection', (socket)=>{
  console.log('Socket connected', socket.id);
  socket.on('disconnect', ()=> console.log('Socket disconnected', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log('Backend listening on', PORT));