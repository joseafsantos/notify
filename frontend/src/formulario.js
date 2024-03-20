import React, { useState } from 'react';

function Formulario() {
  // Definindo os estados para os campos do formulário
  const [pedido, setPedido] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [cliente, setCliente] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [produto, setProduto] = useState('');
  const [cpf, setCPF] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Criando o objeto com os dados do formulário
    const formData = {
      pedido: pedido,
      dataVencimento: dataVencimento,
      cliente: cliente,
      email: email,
      telefone: telefone,
      produto: produto,
      cpf: cpf,
      cnpj: cnpj,
      razaoSocial: razaoSocial
    };

    // Enviando os dados para o backend
    try {
      const response = await fetch('http://localhost:8080/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o servidor');
      }

      alert('Registro criado com sucesso!');
      
      // Limpar os campos do formulário após o envio
      setPedido('');
      setDataVencimento('');
      setCliente('');
      setEmail('');
      setTelefone('');
      setProduto('');
      setCPF('');
      setCNPJ('');
      setRazaoSocial('');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados para o servidor');
    }
  };

  return (
    <div>
      <h2>Formulário de Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label>Pedido:</label>
        <input type="text" value={pedido} onChange={(e) => setPedido(e.target.value)} required /><br />
        
        <label>Data de Vencimento:</label>
        <input type="text" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} required /><br />

        <label>Cliente:</label>
        <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required /><br />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label>Telefone:</label>
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required /><br />

        <label>Produto:</label>
        <input type="text" value={produto} onChange={(e) => setProduto(e.target.value)} required /><br />

        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCPF(e.target.value)} required /><br />

        <label>CNPJ:</label>
        <input type="text" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} /><br />

        <label>Razão Social:</label>
        <input type="text" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} /><br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
