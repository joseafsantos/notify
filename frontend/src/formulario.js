import React, { useState } from 'react';

function Formulario() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://seu-backend.com/upload', {
                method: 'POST',
                body: formData
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
        } else {
            alert('Por favor, selecione um arquivo CSV.');
        }
    };

    return (
        <div>
            <h1>Upload de Arquivo CSV</h1>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <button onClick={handleUpload}>Enviar</button>
        </div>
    );
}

export default Formulario;