package br.com.notify.controle;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.servico.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClienteControle {

    @Autowired
    private ClienteServico cs;

    @GetMapping("/listar")
    public Iterable<ClienteModelo> listar(){
        return cs.listar();
    }


    @GetMapping("")
    public String rota(){
        return "Rota funcionando!";

    }
}
