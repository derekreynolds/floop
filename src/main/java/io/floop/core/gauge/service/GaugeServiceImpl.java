/**
 * 
 */
package io.floop.core.gauge.service;

import io.floop.core.gauge.model.GaugeTemplate;
import io.floop.core.gauge.repository.GaugeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

/**
 * @author Derek Reynolds
 *
 */
@Service
public class GaugeServiceImpl implements GaugeService {

	private final GaugeRepository gaugeRepository;
	
	@Autowired
	public GaugeServiceImpl(GaugeRepository gaugeRepository) {
		this.gaugeRepository = gaugeRepository;
	}
	
	/* (non-Javadoc)
	 * @see io.floop.gauge.service.GaugeService#getList(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<GaugeTemplate> getList(Pageable pageable) {
		
		return gaugeRepository.findAll(pageable);
	}	

	/* (non-Javadoc)
	 * @see io.floop.gauge.service.GaugeService#getTop5(org.springframework.data.domain.Pageable)
	 */
	@Override
	public Slice<GaugeTemplate> getTop5(Pageable pageable) {
		// TODO Auto-genegauged method stub
		return gaugeRepository.findTop5ByOrderByEndDateDesc(pageable);
	}

	/* (non-Javadoc)
	 * @see io.floop.gauge.service.GaugeService#getById(java.lang.String)
	 */
	@Override
	public GaugeTemplate getById(String id) {
		
		return gaugeRepository.findOne(id);
	}

	/* (non-Javadoc)
	 * @see io.floop.gauge.service.GaugeService#save(io.floop.gauge.model.Gauge)
	 */
	@Override
	public void save(GaugeTemplate gauge) {
		gaugeRepository.save(gauge);		
	}

	
	
}
