// bir giriş alanı oluşturur ve bazı özelliklerini alarak kullanıcı arayüzünde görüntüler

import React from "react"; // React'i içe aktarır

const Input = (props) => { // Input bileşeni
  const { type, errorMessage, touched, placeholder, ...inputProps } = props; // Props'ları ayıkla

  return (
    <div className="w-full"> {/* Bileşen konteynırı */}
      <label className="relative block cursor-text w-full"> {/* Giriş alanı etiketi */}
        <input
          type={type} // Giriş alanı tipi
          className={`h-14 w-full border outline-none px-4 peer 
          ${type !== "datetime-local" && "pt-2"}
          ${touched && errorMessage ? "border-red-500" : "border-primary"}
          `}
          required // Gerekli mi?
          {...inputProps} // Diğer giriş alanı özellikleri
        />
        {type !== "datetime-local" && ( // Tip datetime-local değilse
          <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
            {placeholder} {/* Giriş alanı yer tutucusu */}
          </span>
        )}
      </label>
      {touched && <span className="text-xs text-danger">{errorMessage}</span>} {/* Hata mesajı */}
    </div>
  );
};

export default Input; // Bileşeni dışa aktarır
