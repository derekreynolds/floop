package io.floop.core.vote.repository;


import io.floop.core.vote.model.VoteTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Vote entity.
 */
public interface VoteRepository extends MongoRepository<VoteTemplate, String> {
	
	Slice<VoteTemplate> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
