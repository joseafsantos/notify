package br.com.notify.repositorio;

import br.com.notify.modelo.ClienteModelo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepositorio extends CrudRepository<ClienteModelo, Integer> {

}
