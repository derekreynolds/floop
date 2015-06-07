/**
 * 
 */
package io.floop.core.rate.service;

import io.floop.core.rate.model.RateTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface RateTemplateService {

	Slice<RateTemplate> getList(Pageable pageable);
	
	Slice<RateTemplate> getTop5(Pageable pageable);
	
	RateTemplate getById(String id);
	
	void save(RateTemplate rate);
	
}
