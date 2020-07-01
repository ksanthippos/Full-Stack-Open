import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)

    // TESTI: luodaan viesti, joka ei sijaitse palvelimella mutta renderöityy silti selaimeen
    const nonExisting = {
        id: 10000,
        content: 'Not here really...',
        date: new Date().toISOString(),
        important: true
    }
    return request
        .then(response => response.data.concat(nonExisting))    // ilmaantuu selaimeen aina päivitettäessä
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request
        .then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
        .then(response => response.data)
}

export default  { getAll, create, update }