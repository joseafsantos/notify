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

  // Função para limpar os campos do formulário
  const handleLimparFormulario = () => {
    setPedido('');
    setDataVencimento('');
    setCliente('');
    setEmail('');
    setTelefone('');
    setProduto('');
    setCPF('');
    setCNPJ('');
    setRazaoSocial('');
  };

  return (
    <div>
      <h2>Formulário de Cadastro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%', textAlign: 'left', marginRight: '20px', marginLeft: '20px'}}>
          <label>Pedido*:</label>
          <input placeholder='Somente números' type="text" value={pedido} onChange={(e) => setPedido(e.target.value)} required className='form-control'/><br />

          <label>Cliente*:</label>
          <input placeholder='Nome do cliente' type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required className='form-control'/><br />
          
          <label>CPF*:</label>
          <input  placeholder='Somente números' type="text" value={cpf} onChange={(e) => setCPF(e.target.value)} required className='form-control'/><br />

          <label>E-mail*:</label>
          <input placeholder='email@do.cliente' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='form-control'/><br />

          <label>Telefone*:</label>
          <input placeholder='Telefone com DDD somente números' type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required className='form-control'/><br />
        </div>
        <div style={{ width: '50%', textAlign: 'left' }}>
          <label>Produto*:</label>
          <input placeholder='Tipo do certificado' type="text" value={produto} onChange={(e) => setProduto(e.target.value)} required className='form-control'/><br />

          <label>CNPJ**:</label>
          <input placeholder='Somente números' type="text" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} className='form-control'/><br />

          <label>Razão Social**:</label>
          <input placeholder='Razão Social' type="text" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} className='form-control'/><br />

          <label>Data de Vencimento*:</label>
          <input placeholder='00/00/00' type="text" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} required className='form-control'/><br />

          <div style={{ display: 'flex', justifyContent: 'left', width: '100%'}}>
          <button type="submit" style={{ marginRight: '10px', marginTop: '24px' }} className='btn btn-success'>Enviar</button><br />
          <button type="button" onClick={handleLimparFormulario} style={{ marginLeft: '10px', marginTop: '24px' }}className='btn btn-secondary'>Limpar Formulário</button>
          </div>
          <div style={{color: 'gray', fontSize: 12}}>
            <p>*: Campo obrigatório. **: CNPJ e Razão Social devem ser preenchidos, um dos campos não pode ser vazio.</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
