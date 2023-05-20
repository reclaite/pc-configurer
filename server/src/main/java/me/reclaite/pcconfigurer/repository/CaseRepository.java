package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.ComputerCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseRepository extends JpaRepository<ComputerCase, Long> {
}
