package io.floop.common.repository;


import io.floop.common.model.FeedbackTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the {@link FeedbackTemplate} entity.
 */
public interface FeedbackRepository extends MongoRepository<FeedbackTemplate, String> {
	
	Slice<FeedbackTemplate> findByOrderByEndDateDesc(Pageable pageable);
	
}
