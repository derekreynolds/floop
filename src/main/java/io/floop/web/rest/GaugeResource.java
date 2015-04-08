/**
 * 
 */
package io.floop.web.rest;

import io.floop.core.gauge.model.Gauge;
import io.floop.core.gauge.service.GaugeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * @author Derek Reynolds
 *
 */
@RestController
@RequestMapping("/api")
public class GaugeResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final GaugeService gaugeService;
	   
	   @Autowired
	   public GaugeResource(final GaugeService gaugeService) {
		   this.gaugeService = gaugeService;
	   }
	   
	   @RequestMapping(value = "/gauge/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Gauge> get(@PathVariable String id) {
	        log.debug("REST request to get gauge : {}", id);	        
	        
	        return new ResponseEntity<>(gaugeService.getById(id), HttpStatus.OK);
	   }
	   
	   @RequestMapping(value = "/gauge/top5",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<Gauge>> list(Pageable pageable) {
	        log.debug("REST request to get gauge list");	        
	        
	        return new ResponseEntity<>(gaugeService.getTop5(pageable), HttpStatus.OK);
	   }

	    @RequestMapping(value = "/gauge",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> save(@RequestBody Gauge gauge) {
	    	log.debug("Create a new gauge.");	      
	    	
	        gaugeService.save(gauge);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
	    
	    @RequestMapping(value = "/gauge",
	            method = RequestMethod.PUT,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> update(@RequestBody Gauge gauge) {
	    	log.debug("Create a new gauge.");	      
	    	
	        gaugeService.save(gauge);

	        return new ResponseEntity<>(HttpStatus.OK);
	        
	    }
}
