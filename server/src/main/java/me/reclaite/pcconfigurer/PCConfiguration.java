package me.reclaite.pcconfigurer;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "me.reclaite.pcconfigurer.repository")
@EntityScan(basePackages = "me.reclaite.pcconfigurer.model")
public class PCConfiguration {
}
