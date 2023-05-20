package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {
}
