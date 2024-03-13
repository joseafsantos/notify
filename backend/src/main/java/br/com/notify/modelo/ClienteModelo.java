package br.com.notify.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "clientes")
@Getter
@Setter
public class ClienteModelo {

    @Id
    private Integer pedido;
    private Date dataVencimento;
    private String cliente;
    private String email;
    private Integer telefone;
    private String produto;
    private Integer cpf;
    private Integer cnpj;
    private String razaoSocial;
}
