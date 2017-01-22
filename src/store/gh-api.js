import axios from 'axios'

const getUser = (username) => {
  let config = {
    onDownloadProgress: function (progressEvent) {
      console.log(progressEvent)
      // Do whatever you want with the native progress event
    }
  }

  return axios.get('https://api.github.com/users/' + username, config)
}

export { getUser as getUserAPI }
