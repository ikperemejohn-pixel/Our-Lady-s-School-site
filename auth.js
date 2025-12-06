const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const { signJWT } = require('../utils/jwt');
const prisma = new PrismaClient();

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await argon2.verify(user.password, password);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signJWT({ id: user.id, role: user.role, name: user.name });
  res.json({ token, user: { id:user.id, name:user.name, role:user.role, email:user.email } });
});

module.exports = router;