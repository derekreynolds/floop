package io.floop.core.rate.repository;


import io.floop.core.rate.model.RateTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Rate entity.
 */
public interface RateRepository extends MongoRepository<RateTemplate, String> {
	
	Slice<RateTemplate> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
