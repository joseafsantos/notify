package br.com.notify.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "clientes")
@Getter
@Setter
public class ClienteModelo {

    @Id
    private Integer pedido;
    private String dataVencimento;
    private String cliente;
    private String email;
    private String telefone;
    private String produto;
    private String cpf;
    private String cnpj;
    private String razaoSocial;
}
