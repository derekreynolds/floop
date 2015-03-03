/**
 * 
 */
package io.floop.rate.service;

import io.floop.rate.model.Rate;
import io.floop.rate.repository.RateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class RateServiceImpl implements RateService {

	private final RateRepository rateRepository;
	
	@Autowired
	public RateServiceImpl(RateRepository rateRepository) {
		this.rateRepository = rateRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<Rate> getList(Pageable pageable) {
		
		return rateRepository.findAll(pageable);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#getById(java.lang.String)
	 */
	@Override
	public Rate getById(String id) {
		
		return rateRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#save(io.floop.rate.model.Rate)
	 */
	@Override
	public void save(Rate rate) {
		rateRepository.save(rate);		
	}

	
	
}
