/**
 * 
 */
package io.floop.core.rate.service;

import io.floop.core.rate.model.Rate;
import io.floop.core.rate.repository.RateRepository;

import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class RateServiceImpl implements RateService {

	private RateRepository rateRepository;
	
	/* (non-Javadoc)
	 * @see io.floop.core.rate.service.RateService#save(io.floop.core.rate.model.Rate)
	 */
	@Override
	public void save(Rate rate) {
		
		rateRepository.save(rate);
	}	
	

}
