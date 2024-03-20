import React, { useState } from 'react';

function UploadFile() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            // Leitura do arquivo CSV
            const reader = new FileReader();
            reader.onload = () => {
                // Conversão para JSON
                const csvData = reader.result;
                const jsonData = convertCsvToJson(csvData);

                // Envio do JSON para o backend
                sendJsonToBackend(jsonData);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, selecione um arquivo CSV.');
        }
    };

    // Função para converter CSV para JSON
    const convertCsvToJson = (csvData) => {
        // Lógica de conversão do CSV para JSON aqui
        const lines = csvData.split('\n');
        const result = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return result;
    };

    // Função para enviar JSON para o backend
    const sendJsonToBackend = (jsonData) => {
        fetch('http://localhost:8080/clientes/cadastrar-multiplos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (response.ok) {
                alert('Dados do arquivo CSV foram enviados com sucesso!');
            } else {
                alert('Erro ao enviar os dados do arquivo CSV.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar requisição:', error);
        });
    };

    return (
        <div>
            <h1>Upload de Arquivo CSV e Envio para o Backend</h1>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <button onClick={handleUpload}>Enviar</button>
        </div>
    );
}

export default UploadFile;
