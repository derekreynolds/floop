/**
 * 
 */
package io.floop.core.gauge.service;

import io.floop.core.gauge.model.Gauge;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface GaugeService {

	Slice<Gauge> getList(Pageable pageable);
	
	Slice<Gauge> getTop5(Pageable pageable);
	
	Gauge getById(String id);
	
	void save(Gauge gauge);
	
}
