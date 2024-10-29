import React, { useEffect, useState } from 'react';
import inputMask, { MaskTypes } from '../../util/inputMask';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  maskType?: MaskTypes;
};

function TextInputMask({ maskType, onChange, value = '', ...props }: TextInputProps) {
  const [maskedValue, setMaskedValue] = useState(() => {
    if (maskType && value) {
      return inputMask[maskType]({ currentTarget: { value } } as React.ChangeEvent<HTMLInputElement>);
    }
    return value;
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (maskType) {
      const mask = inputMask[maskType];
      event.currentTarget.value = mask(event);
    }

    if (typeof onChange === 'function') {
      onChange(event);
    }
    setMaskedValue(event.currentTarget.value);
  }

  return <input {...props} value={maskedValue} type="text" onChange={handleChange} />;
}

export default TextInputMask;
