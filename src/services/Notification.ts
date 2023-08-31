import devNetwork from '../utilities/devNetwork'

const NetworkService = () => {
  return devNetwork.get(`appNotification/list`)
}

export default {
  NetworkService,
}
