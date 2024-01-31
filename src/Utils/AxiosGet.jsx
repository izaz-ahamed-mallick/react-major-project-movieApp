import axios from 'axios'

const instance = axios.create({
  baseURL:'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTkyNTM0OWM3MTI3NTk2ZGZjYjhiNTZiYjFhN2U1MCIsInN1YiI6IjY1YjFlZmFjZGJmMTQ0MDEzMDliNmQ0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-iVSSR7wPwolXNU9_XAm9KzP6h3thg1c063_NeTRYw'
  }
})

export default instance;