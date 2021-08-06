// const helpers = () => {
//     return{
    
//         signin: async (username, password, url) => {
//             // const history = useHistory();
//             const requestOptions = {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json' 
//                 },
//                 body: JSON.stringify({ 
//                     'username': username, 
//                     'password': password, 
//                     'url': url 
//                 })
//             };
            
//             try{
//                 const response = await fetch('/login', requestOptions)
//                     if (response.status !== 200){
//                         alert("there has been a murder!!!");
//                         console.log({"message":"connection failed"});
//                         return false;
//                     }
//                 const data = await response.json();
//                 console.log(data);
//                 localStorage.setItem("loggedIn", true);
//                 // history.push("/dashboard");
//                 return true;
//             }
//             catch(error){
//                 console.error("There has been an error logging in")
//             }
//         },

//         logout: () => {
//             localStorage.removeItem('loggedIn');
//             localStorage.removeItem('credentials');
//         }
//     }
// }

// export default helpers;