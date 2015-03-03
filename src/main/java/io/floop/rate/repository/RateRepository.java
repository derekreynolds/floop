package io.floop.rate.repository;


import io.floop.rate.model.Rate;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Rate entity.
 */
public interface RateRepository extends MongoRepository<Rate, String> {
	
}
