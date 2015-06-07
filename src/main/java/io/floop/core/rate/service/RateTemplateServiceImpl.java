/**
 * 
 */
package io.floop.core.rate.service;

import io.floop.core.rate.model.RateTemplate;
import io.floop.core.rate.repository.RateTemplateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class RateTemplateServiceImpl implements RateTemplateService {

	private final RateTemplateRepository rateTemplateRepository;
	
	@Autowired
	public RateTemplateServiceImpl(RateTemplateRepository rateTemplateRepository) {
		this.rateTemplateRepository = rateTemplateRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<RateTemplate> getList(Pageable pageable) {
		
		return rateTemplateRepository.findAll(pageable);
	}	

	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#getTop5(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<RateTemplate> getTop5(Pageable pageable) {
		
		return rateTemplateRepository.findTop5ByOrderByEndDateDesc(pageable);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#getById(java.lang.String)
	 */
	@Override
	public RateTemplate getById(String id) {
		
		return rateTemplateRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see io.floop.rate.service.RateService#save(io.floop.rate.model.Rate)
	 */
	@Override
	public void save(RateTemplate rate) {
		rateTemplateRepository.save(rate);		
	}

	
	
}
