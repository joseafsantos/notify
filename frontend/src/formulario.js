import React, { useState } from 'react';

function Formulario() {
    const [pedido, setPedido] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [cliente, setCliente] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [produto, setProduto] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Construir o objeto de registro
        const registro = {
            pedido,
            dataVencimento,
            cliente,
            email,
            telefone,
            produto,
            cpf,
            cnpj,
            razaoSocial
        };

        // Enviar o registro para o backend
        sendRegistroToBackend(registro);
    };

    // Função para enviar o registro para o backend
    const sendRegistroToBackend = (registro) => {
        fetch('http://localhost:8080/clientes/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registro)
        })
        .then(response => {
            if (response.ok) {
                alert('Registro enviado com sucesso!');
                // Limpar campos após o envio bem-sucedido
                setPedido('');
                setDataVencimento('');
                setCliente('');
                setEmail('');
                setTelefone('');
                setProduto('');
                setCpf('');
                setCnpj('');
                setRazaoSocial('');
            } else {
                alert('Erro ao enviar o registro.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar requisição:', error);
            alert('Erro ao enviar o registro.');
        });
    };

    return (
        <div>
            <h1>Formulário de Registro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Pedido:
                    <input type="text" value={pedido} onChange={(e) => setPedido(e.target.value)} />
                </label>
                <br />
                <label>
                    Data de Vencimento:
                    <input type="text" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} />
                </label>
                <br />
                <label>
                    Cliente:
                    <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Telefone:
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </label>
                <br />
                <label>
                    Produto:
                    <input type="text" value={produto} onChange={(e) => setProduto(e.target.value)} />
                </label>
                <br />
                <label>
                    CPF:
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </label>
                <br />
                <label>
                    CNPJ:
                    <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                </label>
                <br />
                <label>
                    Razão Social:
                    <input type="text" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
                </label>
                <br />
                <button type="submit">Enviar Registro</button>
            </form>
        </div>
    );
}

export default Formulario;
