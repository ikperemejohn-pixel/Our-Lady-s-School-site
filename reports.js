const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const prisma = new PrismaClient();

function gradeRemark(grade){
  const map = { A:'Excellent', B:'Very Good', C:'Good', D:'Fair', E:'Pass', F:'Fail' };
  return map[grade] || '';
}

router.get('/:studentId', async (req,res)=>{
  const { studentId } = req.params;
  const { term } = req.query;

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { user: true, class: true }
  });
  if(!student) return res.status(404).json({ error: 'Student not found' });

  const results = await prisma.result.findMany({
    where: { studentId, ...(term ? { term } : {}) },
    include: { subject: true }
  });

  const doc = new PDFDocument({ margin: 40 });
  const filename = `report_${student.user.name.replace(/\s+/g,'_')}.pdf`;
  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  doc.fillColor('#0b3b8c').fontSize(20).text(process.env.SCHOOL_NAME || "Our Lady's Catholic Secondary School, Ilorin", { align:'center' });
  doc.moveDown(0.5);
  doc.fillColor('#333').fontSize(12).text(`${student.user.name}  |  Class: ${student.class.name}  |  Adm No: ${student.admNo}`, { align:'center' });
  if (term) doc.text(`Term: ${term}`, { align:'center' });
  doc.moveDown(1);

  doc.rect(40, doc.y, doc.page.width-80, 24).fill('#0b3b8c'); doc.fill('#fff');
  doc.fontSize(12).text('Subject', 50, doc.y-18, { width:200 });
  doc.text('CA', 260, doc.y-18, { width:50, align:'center' });
  doc.text('Exam', 320, doc.y-18, { width:60, align:'center' });
  doc.text('Total', 390, doc.y-18, { width:60, align:'center' });
  doc.text('Grade', 460, doc.y-18, { width:60, align:'center' });
  doc.text('Remark', 520, doc.y-18, { width:70, align:'left' });
  doc.moveDown(1.6);

  results.forEach(r=>{
    const y = doc.y;
    doc.fill('#000').fontSize(11);
    doc.text(r.subject.name, 50, y, { width:200 });
    doc.text(String(r.caScore), 260, y, { width:50, align:'center' });
    doc.text(String(r.examScore), 320, y, { width:60, align:'center' });
    doc.text(String(r.total), 390, y, { width:60, align:'center' });
    doc.text(r.grade, 460, y, { width:60, align:'center' });
    doc.text(gradeRemark(r.grade) || (r.remark||''), 520, y, { width:150 });
    doc.moveDown(1);
  });

  const verifyUrl = `https://olcssilorin.com/verify?student=${studentId}&term=${encodeURIComponent(term||'all')}`;
  QRCode.toBuffer(verifyUrl, { width: 140 }, (err, buf)=>{
    if(!err){
      doc.image(buf, doc.page.width-180, doc.page.height-220, { width: 120 });
    }
    doc.moveDown(2);
    doc.fill('#0b3b8c').text('Grading: A-Excellent  B-Very Good  C-Good  D-Fair  E-Pass  F-Fail');
    doc.end();
  });

  doc.pipe(res);
});

module.exports = router;