import React, { useState, useEffect } from 'react';

function Tabela() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        fetchDados();
    }, []);

    const fetchDados = async () => {
        try {
            const response = await fetch('http://seu-backend.com/dados');
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do servidor');
            }
            const data = await response.json();
            setDados(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    return (
        <div>
            <h1>Tabela de Dados</h1>
            <table>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Data de Vencimento</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Produto</th>
                        <th>CPF</th>
                        <th>CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            <td>{item.pedido}</td>
                            <td>{item.dataVencimento}</td>
                            <td>{item.cliente}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.produto}</td>
                            <td>{item.cpf}</td>
                            <td>{item.cnpj}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;