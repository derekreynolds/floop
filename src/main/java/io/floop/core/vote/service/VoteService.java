/**
 * 
 */
package io.floop.core.vote.service;

import io.floop.core.vote.model.VoteTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface VoteService {

	Slice<VoteTemplate> getList(Pageable pageable);
	
	Slice<VoteTemplate> getTop5(Pageable pageable);
	
	VoteTemplate getById(String id);
	
	void save(VoteTemplate vote);
	
}
