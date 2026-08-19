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
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Buscar película..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        style={{ padding: '8px', width: '250px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 15px' }}>Buscar</button>
    </form>
  )
}

export default SearchBar