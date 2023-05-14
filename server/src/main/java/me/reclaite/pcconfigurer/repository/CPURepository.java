package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.CPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CPURepository extends JpaRepository<CPU, Long> {
}
