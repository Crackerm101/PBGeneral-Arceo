'use client';
export default function handler(req, res) {
  const card = `
BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL;TYPE=CELL:+1-555-123-4567
EMAIL:john@example.com
ADR;TYPE=HOME:;;123 Main St;New York;NY;10001;USA
ORG:Example Inc.
TITLE:Engineer
END:VCARD
  `.trim();

  res.setHeader('Content-Type', 'text/vcard;charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="john-doe.vcf"');
  res.status(200).send(card);
}
