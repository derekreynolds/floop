package io.floop.core.gauge.repository;


import io.floop.core.gauge.model.Gauge;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Gauge entity.
 */
public interface GaugeRepository extends MongoRepository<Gauge, String> {
	
	Slice<Gauge> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
