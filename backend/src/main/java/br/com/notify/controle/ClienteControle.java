package br.com.notify.controle;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.servico.ClienteServico;
import br.com.notify.servico.EmailServico;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ClienteControle {

    @Autowired
    private ClienteServico cs;

    @GetMapping("/listar")
    public Iterable<ClienteModelo> listar() {
        return cs.listar();
    }

    @GetMapping("/listar-data")
    public Iterable<ClienteModelo> listarDataVencimento(@RequestParam String dataVencimento) {
        return cs.listarDataVencimento(dataVencimento);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModelo cm) {
        return cs.cadastrar(cm);
    }

    // Sobrecarga do método cadastrar para lidar com uma lista de objetos ClienteModelo
    @PostMapping("/cadastrar-multiplos")
    public ResponseEntity<?> cadastrarMultiplos(@RequestBody List<ClienteModelo> clientes) {
        return cs.cadastrarMultiplos(clientes);
    }

    @Autowired
    private EmailServico es;

    @GetMapping("/buscar-email")
    public ResponseEntity<?> buscarEmail(@RequestParam String dataString){
        try {
            Iterable<String> emails = es.buscarEmail(dataString);
            return ResponseEntity.ok(emails);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar e-mails: " + e.getMessage());
        }
    }
    @PostMapping("/enviar-email")
    public ResponseEntity<?> enviarEmail(@RequestBody Map<String, String> requestBody) {
        try {
            String dataVencimento = requestBody.get("dataVencimento");
            String assunto = requestBody.get("assunto");
            String conteudo = requestBody.get("conteudo");

            // Buscar e-mails por data
            Iterable<String> destinatariosIterable = es.buscarEmail(dataVencimento);
            List<String> destinatarios = new ArrayList<>();
            destinatariosIterable.forEach(destinatarios::add);

            // Enviar e-mail para os destinatários
            es.enviarEmail(destinatarios, assunto, conteudo);

            return ResponseEntity.ok("E-mails enviados com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao enviar e-mails: " + e.getMessage());
        }
    }


    @GetMapping("")
    public String rota() {
        return "Rota funcionando!";
    }
}
