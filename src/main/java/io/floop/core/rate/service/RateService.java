/**
 * 
 */
package io.floop.core.rate.service;

import io.floop.core.rate.model.Rate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface RateService {

	Slice<Rate> getList(Pageable pageable);
	
	Slice<Rate> getTop5(Pageable pageable);
	
	Rate getById(String id);
	
	void save(Rate rate);
	
}