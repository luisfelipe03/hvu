package br.edu.ufape.hvu.model;

import java.util.*;
import java.math.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor 
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public  class TipoConsulta  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private long id;
	private String tipo;
	@OneToMany
	@JoinColumn(name = "tipoConsulta_id")
	@ToString.Exclude
	private List<Agendamento> agendamento; 
	@OneToMany
	@JoinColumn(name = "tipoConsulta_id")
	@ToString.Exclude
	private List<Vaga> vaga; 

}