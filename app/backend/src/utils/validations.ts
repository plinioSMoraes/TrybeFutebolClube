function validations(email: string, password: string):boolean {
  const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    .test(email);
  const passwordValidation = password.length >= 6;
  return emailValidation && passwordValidation;
}

export default validations;
