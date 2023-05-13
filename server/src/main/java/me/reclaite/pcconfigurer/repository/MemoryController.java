package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoryController extends JpaRepository<Memory, Long> {
}
