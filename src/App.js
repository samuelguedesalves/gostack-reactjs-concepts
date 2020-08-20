import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    } )
  }, []);

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `repositorie - ${Date.now()}`,
      url: 'www.github.com',
      techs: ['node', 'react', 'sql']
    }).then( response => {
      setRepositories([...repositories, response.data])
    } )
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then( response => {
        const newRepositoriesListage = repositories.filter(repositorie => repositorie.id !== id);
        setRepositories(newRepositoriesListage);
    } )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repositorie =>  

          <li key={repositorie.id} >
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>

        ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
