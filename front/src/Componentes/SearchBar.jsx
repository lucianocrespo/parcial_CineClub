import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() // Evita que se recargue la página web al enviar el formulario
    
    // Busca si el input no está vacío
    if (inputValue.trim() !== '') {
      onSearch(inputValue)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Buscar película..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="input-text"
      />
      <button type="submit" className="btn-primary">Buscar</button>
    </form>
  )
}

export default SearchBar