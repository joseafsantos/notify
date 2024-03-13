package br.com.notify.controle;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.servico.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ClienteControle {

    @Autowired
    private ClienteServico cs;

    @GetMapping("/listar")
    public Iterable<ClienteModelo> listar(){
        return cs.listar();
    }
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModelo cm){
        return cs.cadastrar(cm);
    }
    @GetMapping("")
    public String rota(){
        return "Rota funcionando!";

    }
}
