import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeGenerator() {
  const personal = {name:'Chirag', email:'Chirag@gmail.com', phone:'095656565'};

  // Combine personal details into a single string
  const personalDetails = `${personal.name}, ${personal.email}, ${personal.phone}`;


    const encodedDetails = encodeURIComponent(personalDetails);

    const url = `https://google.com/details?id=${encodedDetails}`;

  return (
    <QRCode value={url} />
  );
}

export default QRCodeGenerator;