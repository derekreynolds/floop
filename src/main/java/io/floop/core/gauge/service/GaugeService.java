/**
 * 
 */
package io.floop.core.gauge.service;

import io.floop.core.gauge.model.GaugeTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface GaugeService {

	Slice<GaugeTemplate> getList(Pageable pageable);
	
	Slice<GaugeTemplate> getTop5(Pageable pageable);
	
	GaugeTemplate getById(String id);
	
	void save(GaugeTemplate gauge);
	
}
