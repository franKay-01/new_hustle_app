import Cookies from "js-cookie";

const UserCheck = () => { 
  const messages = [];

  if (Cookies.get('email_verified') === 'false') {
    messages.push({"id": "email", "msg": "Email is not verified"});
  }

  if (Cookies.get('has_verified_business_details') === 'false') {
    messages.push({"id": "bdt", "msg": "Business details are not verified"});
  }

  if (Cookies.get('has_verified_id_details')  === 'false') {
    messages.push({"id": "id", "msg": "ID details are not verified"});
  }

  return messages;
}

export default UserCheck