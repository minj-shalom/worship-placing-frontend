const redirect = (isAdmin: Boolean) => {
  if (isAdmin) {
    window.location.href = "/admin";
  } else {
    window.location.href = "/";
  }
};

export default redirect;
