package io.floop.core.vote.repository;


import io.floop.core.vote.model.Vote;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Vote entity.
 */
public interface VoteRepository extends MongoRepository<Vote, String> {
	
	Slice<Vote> findTop5ByOrderByEndDateDesc(Pageable pageable);
	
}
