// import axios from 'axios';
// import Cookies from 'js-cookie';

// // STORE USER IN COOKIES
// export const storeUser = async (token, isRemember) => {
//   const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
//   Cookies.set('accessToken', token, {
//     expires,
//     secure: true,
//     sameSite: 'Strict',
//     path: '/',
//   });
// };

// // GET USER FROM COOKIES
// export const getUserToken = async () => {
//   const token = Cookies.get('accessToken');
//   if (token) {
//     return token;
//   } else {
//     const axiosInstance = axios.create({
//       baseURL: 'http://localhost:5173/api',
//       withCredentials: true,
//     });

//     try {
//       const response = await axiosInstance.post('/auth/refresh');
//       if (response.data.status === 'Success') {
//         storeUser(response.data.accessToken);
//         return response.data.accessToken;
//       }
//     } catch {
//       return null;
//     }
//   }
// };

// // HANDLE LOGOUT
// export const handleLogOut = () => {
//   axios
//     .post('http://localhost:5173/api/auth/logout')
//     .then((res) => {
//       if (res.data.status === 'Success') {
//         Cookies.remove('accessToken');
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   location.pathname = '/linkedin-clone/';
// };
