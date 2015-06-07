/**
 * 
 */
package io.floop.web.rest;

import io.floop.core.rate.model.RateTemplate;
import io.floop.core.rate.service.RateTemplateService;
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
public class RateTemplateResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final RateTemplateService rateTemplateService;
	   
	   @Autowired
	   public RateTemplateResource(final RateTemplateService rateTemplateService) {
		   this.rateTemplateService = rateTemplateService;
	   }
	   
	   @RequestMapping(value = "/rate/template/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<RateTemplate> get(@PathVariable String id) {
	        log.debug("REST request to get Rating : {}", id);	        
	        
	        return new ResponseEntity<>(rateTemplateService.getById(id), HttpStatus.OK);
	   }
	   
	   @RequestMapping(value = "/rate/template/top5",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<RateTemplate>> list(Pageable pageable) {
	        log.debug("REST request to get Rating list");	        
	        
	        return new ResponseEntity<>(rateTemplateService.getTop5(pageable), HttpStatus.OK);
	   }

	    @RequestMapping(value = "/rate/template",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> save(@RequestBody RateTemplate rate) {
	    	log.debug("Create a new rate.");	      
	    	
	        rateTemplateService.save(rate);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
	    
	    @RequestMapping(value = "/rate/template",
	            method = RequestMethod.PUT,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> update(@RequestBody RateTemplate rate) {
	    	log.debug("Create a new rate.");	      
	    	
	        rateTemplateService.save(rate);

	        return new ResponseEntity<>(HttpStatus.OK);
	        
	    }
}
