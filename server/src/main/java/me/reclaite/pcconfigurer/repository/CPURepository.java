package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.CPU;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CPURepository extends JpaRepository<CPU, Long> {
}
