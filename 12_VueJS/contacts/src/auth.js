import axios from 'axios';

export default {
   login(username, password, callback) {
      if (localStorage.token) {
         callback({authenticated: false});
         this.onLoginStatusChanged(true);
         return;
      }

      authenticationRequest(username, password, (res) => {
         if (res.authenticated) {
            localStorage.token = res.token;
            callback({authenticated: true, token: res.token});
            this.onLoginStatusChanged(true);
         } else {
            delete localStorage.token;
            callback({authenticated: false});
            this.onLoginStatusChanged(false);
         }
      })
   },

   logout(callback) {
      delete localStorage.token;
      callback({authenticated: false});
      this.onLoginStatusChanged(false);
   },

   loggedIn() {
      return !!localStorage.token;
   },

   onLoginStatusChanged() {}
}

function authenticationRequest(username, password, callback) {
   axios.get('https://jsonplaceholder.typicode.com/users?username=' + username + '&email=' + password)
      .then((result) => {
         if (result.data.length > 0) {
            callback({
               authenticated: true,
               token: Math.random().toString(36).substring(7)
            });
         } else {
            callback({
               authenticated: false
            });
         }
      }).catch(err => console.log(err));
}
