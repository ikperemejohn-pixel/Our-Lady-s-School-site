const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:studentId', async (req,res)=>{
  const { studentId } = req.params;
  const { term } = req.query;
  const where = { studentId };
  if (term) where.term = term;
  const results = await prisma.result.findMany({
    where,
    include: { subject: true, student: { include: { user:true, class:true } } }
  });
  res.json(results);
});

router.post('/', async (req,res)=>{
  const { studentId, subjectId, term, caScore, examScore, grade, remark } = req.body;
  const total = Number(caScore || 0) + Number(examScore || 0);
  const upserted = await prisma.result.upsert({
    where: { studentId_subjectId_term: { studentId, subjectId, term } },
    update: { caScore, examScore, total, grade, remark },
    create: { studentId, subjectId, term, caScore, examScore, total, grade, remark }
  });
  res.json(upserted);
});

module.exports = router;