
'use client';
import React from 'react';
import { MdCloudDownload } from "react-icons/md";
const contact = {
  firstName: 'PBGEN GLENN OLIVER C',
  lastName: 'CINCO ',
  phone: '+639173536887',
  email: 'cincoglennoliver@yahoo.com',
  organization: 'District Director,SPD',
  location: 'Fort Bonifacio,Taguig City 1100, Philippines',
};

function generateVCF(contact) {
  return `
BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName}
FN:${contact.firstName} ${contact.lastName}
ORG:${contact.organization}
TITLE:${contact.location}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
END:VCARD
  `.trim();
}

function downloadVCF() {
  const vcfContent = generateVCF(contact);
  const blob = new Blob([vcfContent], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${contact.firstName}_${contact.lastName}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function App() {
  return (
    <div className="flex w-full justify-center mt-5 px-6">
      <button
        className="w-full max-w-[320px] px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full font-extrabold tracking-widest outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
        onClick={downloadVCF}
      >
        <MdCloudDownload className="text-xl" />
        <span>SAVE CONTACT</span>
      </button>
    </div>
  );
}
