/**
 * 
 */
package io.floop.common.service;

import io.floop.common.model.FeedbackTemplate;
import io.floop.common.repository.FeedbackRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;
	
	@Autowired
	public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.common.service.FeedbackService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<FeedbackTemplate> getList(Pageable pageable) {
		
		return feedbackRepository.findAll(pageable);
	}	

		
}
