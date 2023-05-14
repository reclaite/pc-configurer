package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.VideoCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCardRepository extends JpaRepository<VideoCard, Long> {
}
