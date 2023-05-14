package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, Long> {
}
