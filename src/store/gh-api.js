import axios from 'axios'

const getUser = (username) => {
  // let config = {
  //   onDownloadProgress: function (progressEvent) {
  //     console.log(progressEvent)
  //   }
  // }
  return axios.get('https://api.github.com/users/' + username)
}

export { getUser as getUserAPI }
