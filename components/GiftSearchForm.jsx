import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';

const wizardData = {
  "Kadına": {
    "Doğum Günü": "/kadina-dogum-gunu-hediyeleri",
    "Romantik": "/kadina-romantik-hediyeler",
    "Hatıralık": "/kadina-hatiralik-hediyeler",
    // Diğer seçenekler buraya eklenebilir
  },
  "Erkeğe": {
    "Doğum Günü": "/erkege-dogum-gunu-hediyeleri",
    "Romantik": "/erkege-romantik-hediyeler",
    "Hatıralık": "/erkege-hatiralik-hediyeler",
    // Diğer seçenekler buraya eklenebilir
  },
  "Arkadaşa": {
    "Doğum Günü": "/arkadasa-dogum-gunu-hediyeleri",
    "Romantik": "/arkadasa-romantik-hediyeler",
    "Hatıralık": "/arkadasa-hatiralik-hediyeler",
    // Diğer seçenekler buraya eklenebilir
  },
};

const optionsRecipient = Object.keys(wizardData).map((recipient) => ({
  value: recipient,
  label: recipient,
}));

const optionsOccasionSet = new Set(Object.values(wizardData).flatMap((obj) => Object.keys(obj)));
const optionsOccasion = Array.from(optionsOccasionSet).map((occasion) => ({
  value: occasion,
  label: occasion,
}));
  
const GiftSearchForm = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const router = useRouter();

  const searchGifts = () => {
    if (recipient && occasion) {
      const url = wizardData[recipient][occasion];
      if (url) {
        router.push(url);
      } else {
        alert('Seçilen alıcı ve durum için hediye sayfası bulunamadı.');
      }
    } else {
      alert('Lütfen bir alıcı ve bir durum seçin.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-[1.5rem]">
      <div className="w-full sm:w-auto sm:flex sm:space-x-4 sm:mb-4 ">
        <div className="w-auto ">
          <label>Kime Hediye:</label>
          <Select
            options={optionsRecipient}
            value={optionsRecipient.find((option) => option.value === recipient)}
            onChange={(selectedOption) => setRecipient(selectedOption.value)}
            placeholder="Alıcı seçin"
            className="w-auto"
          />
        </div>
        <div className="w-auto">
          <label>Ne Hediyesi:</label>
          <Select
            options={optionsOccasion}
            value={optionsOccasion.find((option) => option.value === occasion)}
            onChange={(selectedOption) => setOccasion(selectedOption.value)}
            placeholder="Durum seçin"
            className="w-full"
          />
        </div>
        <button onClick={searchGifts} className="btn-primary py-2 px-4 my-4 w-full sm:w-auto">
          Hediye Ara
        </button>
      </div>
    </div>
  );
};

export default GiftSearchForm;
