import devNetwork from '../utilities/devNetwork'

const ProfileService = () => {
  return devNetwork.get(`app-user/profile`)
}

export default {
  ProfileService,
}
