package br.com.notify.servico;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.modelo.RespostaModelo;
import br.com.notify.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServico {

    @Autowired
    private ClienteRepositorio cr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<ClienteModelo> listar() {
        return cr.findAll();
    }

    public ResponseEntity<?> cadastrar(ClienteModelo cm) {
        if (cm.getPedido().equals("")) {
            rm.setMensagem("Número do pedido é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getDataVencimento().equals("")) {
            rm.setMensagem("Data de vencimento é obrigatória.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getCliente().equals("")) {
            rm.setMensagem("Nome do cliente é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getEmail().equals("")) {
            rm.setMensagem("Email do cliente é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getTelefone().equals("")) {
            rm.setMensagem("Telefone do cliente é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getProduto().equals("")) {
            rm.setMensagem("Produto é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getCpf().equals("")) {
            rm.setMensagem("CPF é obrigatório.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (!cm.getCnpj().equals("") && cm.getRazaoSocial().equals("")) {
            rm.setMensagem("Se for pessoa jurídica, CNPJ e Razão Social são obrigatórios.");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(cr.save(cm), HttpStatus.CREATED);
        }
    }

    public ResponseEntity<?> cadastrarMultiplos(List<ClienteModelo> clientes) {
        for (ClienteModelo cliente : clientes) {
            ResponseEntity<?> response = cadastrar(cliente);
            if (!response.getStatusCode().is2xxSuccessful()) {
                return response;
            }
        }
        return new ResponseEntity<>("Clientes cadastrados com sucesso.", HttpStatus.CREATED);
    }
    public Iterable<ClienteModelo> listarDataVencimento(String dataVencimento){
        return cr.findByDataVencimento(dataVencimento);
    }

}
