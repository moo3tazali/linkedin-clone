export function checkInputDirection(text) {
  const isRTL = /[\u0600-\u06FF\u0750-\u077F]/.test(text);
  if (isRTL) {
    return "rtl";
  } else {
    return "ltr";
  }
}
// go to utlis 
