//import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';/** Pacote **/
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) { 
  const history = useHistory();
  const [ usuario, setUsuario] = useState('DevRoSandre');
  const [ erro, setErro] = useState(false);
  function handlePesquisa()
    {
      axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => 
      {        
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName',JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/repositories');//direcionando para Repoitories        
      }).catch(err=>{setErro(true)});
      
    }
  return(    
    <S.HomeContainer> 
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario}  onChange={e => setUsuario(e.target.value)} />
        <S.Button onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
    { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' }
    
    </S.HomeContainer>
  );
}

export default App;
//JSX
// <p>{usuario}</p>