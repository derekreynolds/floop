package io.floop.core.gauge.repository;


import io.floop.core.gauge.model.GaugeTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the PetitionTemplate entity.
 */
public interface GaugeRepository extends MongoRepository<GaugeTemplate, String> {
	
	Slice<GaugeTemplate> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
