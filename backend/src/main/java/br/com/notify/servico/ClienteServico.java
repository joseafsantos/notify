package br.com.notify.servico;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServico {

    @Autowired
    private ClienteRepositorio cr;

    public Iterable<ClienteModelo> listar(){
        return cr.findAll();
    }


}
