/**
 * 
 */
package io.floop.core.vote.service;

import io.floop.core.vote.model.Vote;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface VoteService {

	Slice<Vote> getList(Pageable pageable);
	
	Slice<Vote> getTop5(Pageable pageable);
	
	Vote getById(String id);
	
	void save(Vote vote);
	
}
