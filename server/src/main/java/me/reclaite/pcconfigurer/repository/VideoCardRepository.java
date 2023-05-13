package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.VideoCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoCardRepository extends JpaRepository<VideoCard, Long> {
}
