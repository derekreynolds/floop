/**
 * 
 */
package io.floop.web.rest;

import io.floop.core.gauge.model.GaugeTemplate;
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
public class GaugeTemplateResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final GaugeService gaugeService;
	   
	   @Autowired
	   public GaugeTemplateResource(final GaugeService gaugeService) {
		   this.gaugeService = gaugeService;
	   }
	   
	   @RequestMapping(value = "/gauge/template/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<GaugeTemplate> get(@PathVariable String id) {
	        log.debug("REST request to get gauge : {}", id);	        
	        
	        return new ResponseEntity<>(gaugeService.getById(id), HttpStatus.OK);
	   }
	   
	   @RequestMapping(value = "/gauge/template/top5",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<GaugeTemplate>> list(Pageable pageable) {
	        log.debug("REST request to get gauge list");	        
	        
	        return new ResponseEntity<>(gaugeService.getTop5(pageable), HttpStatus.OK);
	   }

	    @RequestMapping(value = "/gauge/template",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> save(@RequestBody GaugeTemplate gauge) {
	    	log.debug("Create a new gauge.");	      
	    	
	        gaugeService.save(gauge);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
	    
	    @RequestMapping(value = "/gauge/template",
	            method = RequestMethod.PUT,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> update(@RequestBody GaugeTemplate gauge) {
	    	log.debug("Create a new gauge.");	      
	    	
	        gaugeService.save(gauge);

	        return new ResponseEntity<>(HttpStatus.OK);
	        
	    }
}
