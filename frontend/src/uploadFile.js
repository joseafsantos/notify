import React, { useState } from 'react';
import axios from 'axios';
import * as Papa from 'papaparse'; // Importa a biblioteca PapaParse para lidar com arquivos CSV

function UploadFile() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                // Realiza a leitura do arquivo CSV
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const csvData = event.target.result;

                    // Converte os dados do arquivo CSV para um array
                    const { data } = Papa.parse(csvData, { header: true });

                    // Envia o array para o servidor
                    const response = await axios.post('http://localhost:8080/cadastrar-multiplos', data);

                    console.log(response.data);
                };

                reader.readAsText(file); // Inicia a leitura do arquivo como texto
            } catch (error) {
                console.error('Erro ao enviar arquivo:', error);
            }
        } else {
            console.error('Nenhum arquivo selecionado.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar</button>
        </div>
    );
}

export default UploadFile;
