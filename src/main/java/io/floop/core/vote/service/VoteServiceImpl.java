/**
 * 
 */
package io.floop.core.vote.service;



import io.floop.core.vote.model.VoteTemplate;
import io.floop.core.vote.repository.VoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class VoteServiceImpl implements VoteService {

	private final VoteRepository voteRepository;
	
	@Autowired
	public VoteServiceImpl(VoteRepository voteRepository) {
		this.voteRepository = voteRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.vote.service.VoteService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<VoteTemplate> getList(Pageable pageable) {
		
		return voteRepository.findAll(pageable);
	}	

	/* (non-Javadoc)
	 * @see io.floop.vote.service.VoteService#getTop5(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<VoteTemplate> getTop5(Pageable pageable) {
		
		return voteRepository.findTop5ByOrderByEndDateDesc(pageable);
	}

	/* (non-Javadoc)
	 * @see io.floop.vote.service.VoteService#getById(java.lang.String)
	 */
	@Override
	public VoteTemplate getById(String id) {
		
		return voteRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see io.floop.vote.service.VoteService#save(io.floop.vote.model.Vote)
	 */
	@Override
	public void save(VoteTemplate vote) {
		voteRepository.save(vote);		
	}

	
	
}
