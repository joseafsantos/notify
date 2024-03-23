import React, { useState, useEffect } from 'react';

function Tabela() {
    const [dados, setDados] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [registrosPorPagina, setRegistrosPorPagina] = useState(15);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const handleDataChange = (event) => {
        setDataSelecionada(event.target.value);
        setPaginaAtual(1); // Resetar para a primeira página ao alterar a data
    };

    const handlePaginaChange = (pagina) => {
        setPaginaAtual(pagina);
    };

    const buscarDestinatarios = async () => {
        try {
            const response = await fetch(`http://localhost:8080/buscar-email?dataString=${dataSelecionada}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar destinatários');
            }
            const destinatarios = await response.json(); // Receber a lista de destinatários
            enviarEmails(destinatarios);
        } catch (error) {
            console.error('Erro ao buscar destinatários:', error);
        }
    };

    const enviarEmails = async (destinatarios) => {
        try {
            destinatarios.forEach(async (destinatario) => {
                const response = await fetch('http://localhost:8080/enviar-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        destinatarios: [destinatario],
                        assunto: 'Assunto do e-mail',
                        conteudo: '' // Deixar vazio para utilizar o conteúdo do servidor
                    })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Erro ao enviar e-mail para ${destinatario}: ${errorMessage}`);
                }

                console.log(`E-mail enviado com sucesso para ${destinatario}.`);
            });
        } catch (error) {
            console.error('Erro ao enviar e-mails:', error.message);
        }
    };

    useEffect(() => {
        fetchDados();
    }, [dataSelecionada, paginaAtual]); // Atualizar dados quando a data selecionada ou a página atual mudar

    const fetchDados = async () => {
        try {
            const response = await fetch(`http://localhost:8080/listar-data?dataVencimento=${dataSelecionada}&pagina=${paginaAtual}&registrosPorPagina=${registrosPorPagina}`);
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
            <label htmlFor="dataSelecionada">Selecione uma data:</label>
            <input type="text" id="dataSelecionada" value={dataSelecionada} onChange={handleDataChange} />
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
            <button onClick={buscarDestinatarios}>Notificar</button>
            {/* Adicionar navegação por páginas */}
            <div>
                <button onClick={() => handlePaginaChange(paginaAtual - 1)} disabled={paginaAtual === 1}>Anterior</button>
                <button onClick={() => handlePaginaChange(paginaAtual + 1)}>Próxima</button>
            </div>
        </div>
    );
}

export default Tabela;
