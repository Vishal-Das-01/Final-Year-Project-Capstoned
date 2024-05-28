import React, { useEffect } from 'react';

const OTPInput = ({ otpValues, onOTPChange }) => {

  const handleInput = (index, value) => {
    const newValues = [...otpValues]
    newValues[index] = value;
    onOTPChange(newValues);
  };
  
  useEffect(() => {
    const inputs = document.querySelectorAll('.otp-input');

    const handleInputEvent = (index) => (e) => {
      const input = e.target;
      if (input.value.length === 1) {
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        } else {
          input.blur();
        }
        handleInput(index, input.value);
      }
    };

    const handleKeydownEvent = (index) => (e) => {
      const input = e.target;
      if (e.key === 'Backspace' && input.value.length === 0) {
        const prevInput = inputs[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
        handleInput(index, "");
      }
    };

    inputs.forEach((input, index) => {
      input.addEventListener('input', handleInputEvent(index));
      input.addEventListener('keydown', handleKeydownEvent(index));
    });

    return () => {
      inputs.forEach((input, index) => {
        input.removeEventListener('input', handleInputEvent(index));
        input.removeEventListener('keydown', handleKeydownEvent(index));
      });
    };
  }, [otpValues]);

  return (
    <div className="flex justify-center gap-3 mb-6">
      {otpValues.map((value, index) => (
        <input
          key={index}
          className="otp-input bg-[#f6f6f6] w-10 h-10 text-center border rounded-md shadow-sm focus:border-[#565656] focus:ring-[#565656]"
          type="text"
          maxLength="1"
          pattern="[0-9]"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
        />
      ))}
    </div>
  );
};

export default OTPInput;