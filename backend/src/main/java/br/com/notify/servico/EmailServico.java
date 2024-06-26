package br.com.notify.servico;

import br.com.notify.modelo.ClienteModelo;
import br.com.notify.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class EmailServico {

    @Value("${email.username}")
    private String emailUsername;

    @Value("${email.password}")
    private String emailPassword;

    private Session getEmailSession(){
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Authenticator auth = new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication(emailUsername, emailPassword);
            }
        };
        return Session.getInstance(props, auth);
    }

    public void enviarEmail(List<String> destinatarios, String assunto, String conteudo) {
        try {
            Message message = new MimeMessage(getEmailSession());
            message.setFrom(new InternetAddress(emailUsername));
            InternetAddress[] enderecos = new InternetAddress[destinatarios.size()];
            for(int i = 0; i < destinatarios.size(); i++){
                enderecos[i] = new InternetAddress(destinatarios.get(i));
            }
            message.setRecipients(Message.RecipientType.TO, enderecos);

            message.setSubject(assunto);
            message.setContent(conteudo, "text/html"); // Define o conteúdo como HTML

            Transport.send(message);
            System.out.println("E-mail enviado com sucesso para: " + destinatarios);
        } catch (MessagingException e){
            System.out.println("Erro ao enviar e-mail: " + e.getMessage());
        }
    }


    @Autowired
    private ClienteRepositorio cr;

    public Iterable<String> buscarEmail(String dataString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy");
        LocalDate data = LocalDate.parse(dataString, formatter);

        String dataStr = data.format(formatter);

        Iterable<ClienteModelo> clientes = cr.findByDataVencimento(dataStr);

        List<String> emails = new ArrayList<>();
        clientes.forEach(cliente -> emails.add(cliente.getEmail()));
        return emails;
    }

}
