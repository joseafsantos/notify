package br.com.notify.servico;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.modelo.RespostaModelo;
import br.com.notify.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ClienteServico {

    @Autowired
    private ClienteRepositorio cr;

    public Iterable<ClienteModelo> listar(){
        return cr.findAll();
    }
    @Autowired
    private RespostaModelo rm;

    public ResponseEntity<?> cadastrar(ClienteModelo cm){

        if(cm.getPedido().equals("")) {
            rm.setMensagem("Número do pedido é orbigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if(cm.getDataVencimento().equals("")){
            rm.setMensagem("Data de vancimento é orbigatória.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if(cm.getCliente().equals("")){
            rm.setMensagem("Nome do cliente é orbigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if (cm.getEmail().equals("")){
            rm.setMensagem("Email do cliente é obrigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if (cm.getTelefone().equals("")){
            rm.setMensagem("Telefone do cliente é obrigatório.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if(cm.getProduto().equals("")){
            rm.setMensagem("Produto é obrigadorio.");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if (cm.getCpf().equals("")){
            rm.setMensagem("CPF é obrigatório.");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else if(!cm.getCnpj().equals("") && cm.getRazaoSocial().equals("")){
            rm.setMensagem("Se for pessoa jurídica, CNPJ e Razão Social são obrigatórios.");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<ClienteModelo>(cr.save(cm), HttpStatus.CREATED);
        }
    }
}