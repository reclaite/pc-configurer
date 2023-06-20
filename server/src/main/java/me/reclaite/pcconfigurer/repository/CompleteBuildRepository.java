package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.CompleteBuild;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompleteBuildRepository extends JpaRepository<CompleteBuild, String> {
}
