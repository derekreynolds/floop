/**
 * 
 */
package io.floop.rate.service;

import io.floop.rate.model.Rate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface RateService {

	Slice<Rate> getList(Pageable pageable);
	
	Rate getById(String id);
	
	void save(Rate rate);
	
}
