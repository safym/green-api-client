// Отформатировать номер телефона 71234567890 в строку формата +7 123 456-78-90
export function formatPhoneNumber (phoneNumber: string) {
  const phoneNumberClear = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.length !== 11) {
    return 
  }

  const countryCode = phoneNumberClear.slice(0, 1);
  const firstPart = phoneNumberClear.slice(1, 4);
  const secondPart = phoneNumberClear.slice(4, 7);
  const thirdPart = phoneNumberClear.slice(7, 9);
  const fourthPart = phoneNumberClear.slice(9, 11);

  return `+${countryCode} ${firstPart} ${secondPart}-${thirdPart}-${fourthPart}`;
}