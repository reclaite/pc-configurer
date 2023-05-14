package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {
}
