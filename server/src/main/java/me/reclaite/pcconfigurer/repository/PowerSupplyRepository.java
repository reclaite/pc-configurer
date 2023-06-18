package me.reclaite.pcconfigurer.repository;

import me.reclaite.pcconfigurer.model.PowerSupply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PowerSupplyRepository extends JpaRepository<PowerSupply, Long> {
}
