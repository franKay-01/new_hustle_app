const useCheckPasswordFunction = () => {
  const checkPassword = async (password) => {
    const minLength = 8;
  
    // Check if the password meets the minimum length requirement
    if (password.length < minLength) {
      return false;
    }
  
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Check for at least one digit
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Check for at least one special character
    if (!/[$@$!%*?&]/.test(password)) {
      return false;
    }
  
    // Password passed all checks
    return true;
  }
  
  return { checkPassword }
}

export default useCheckPasswordFunction