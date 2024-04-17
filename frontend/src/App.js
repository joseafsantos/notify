import './App.css';
import Formulario from './formulario';
import Tabela from './tabela';
import UploadFile from './uploadFile';

function App() {
  return (
    <div className="App">
      <h1>Notificação de Vencimento</h1>
      <br>
      </br>
      <Formulario />
      <br>
      </br>
      <UploadFile />
      <br>
      </br>
      <Tabela />
      
    </div>
  );
}

export default App;
