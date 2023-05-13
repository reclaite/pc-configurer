package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRepository extends JpaRepository<Storage, Long> {
}
