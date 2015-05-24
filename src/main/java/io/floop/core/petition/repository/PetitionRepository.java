package io.floop.core.petition.repository;


import io.floop.core.petition.model.PetitionTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Petition entity.
 */
public interface PetitionRepository extends MongoRepository<PetitionTemplate, String> {
	
	Slice<PetitionTemplate> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
