export const getToken = () => {
  const userToken = JSON.parse(localStorage.getItem('userInfo'));
  return userToken?.token || null;
};

export const setToken = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  console.log('Setting User Info:', userInfo); // Check what data is being set
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('userInfo')) || null;
};

export const getRoleSessionStatus = () => {
  return JSON.parse(localStorage.getItem('userInfo'))?.session_status || null;
};

export const removeUserSession = () => {
  localStorage.removeItem('userInfo');
};
