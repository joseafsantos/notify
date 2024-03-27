import React, { useState, useEffect } from 'react';

function Tabela() {
    const [dados, setDados] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState('');
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
            const conteudoEmails = comporConteudoEmail(dados); // Compor o conteúdo do e-mail com base nos resultados da busca
            enviarEmails(destinatarios, conteudoEmails); // Enviar e-mails com o conteúdo composto
        } catch (error) {
            console.error('Erro ao buscar destinatários:', error);
        }
    };

    const comporConteudoEmail = (dados) => {
        return dados.map(item => {
            let saudacao = `<p>Olá ${item.cliente.split(' ')[0]},</p>`;
            let assinatura = '';
            if (item.cnpj) {
                assinatura = `<p>Sua assinatura do tipo ${item.produto} com razão social ${item.razaoSocial} vencerá dia ${item.dataVencimento}, entre em contato conosco para realizarmos a renovação. Basta responder esse e-mail ou nos ligar nos números...</p>`;
            } else {
                assinatura = `<p>Sua assinatura do tipo ${item.produto} em nome de ${item.cliente} vencerá dia ${item.dataVencimento}, entre em contato conosco para realizarmos a renovação. Basta responder esse e-mail ou nos ligar nos números...</p>`;
            }
            return saudacao + assinatura;
        });
    };

    const enviarEmails = async (destinatarios, conteudoEmails) => {
        try {
            destinatarios.forEach(async (destinatario, index) => {
                const response = await fetch('http://localhost:8080/enviar-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        destinatarios: [destinatario],
                        assunto: 'Assunto do e-mail',
                        conteudo: conteudoEmails[index] // Usar o conteúdo do e-mail composto
                    })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Erro ao enviar e-mail para ${destinatario}: ${errorMessage}`);
                }

                console.log(`E-mail enviado com sucesso.`);
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
            const response = await fetch(`http://localhost:8080/listar-data?dataVencimento=${dataSelecionada}&pagina=${paginaAtual}`);
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
            <h2>Tabela de Dados</h2>
            <label htmlFor="dataSelecionada">Selecione uma data:</label>
            <input type="text" id="dataSelecionada" value={dataSelecionada} onChange={handleDataChange} placeholder='00/00/00'/>
            <table>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Cliente</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Produto</th>
                        <th>CNPJ</th>
                        <th>Razão Social</th>
                        <th>Data de Vencimento</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item, index) => (
                        <tr key={index}>
                            <td>{item.pedido}</td>
                            <td>{item.cliente}</td>
                            <td>{item.cpf}</td>
                            <td>{item.email}</td>
                            <td>{item.telefone}</td>
                            <td>{item.produto}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.razaoSocial}</td>
                            <td>{item.dataVencimento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={buscarDestinatarios} className='btn btn-success'>Notificar</button>
            
        </div>
    );
}

export default Tabela;
