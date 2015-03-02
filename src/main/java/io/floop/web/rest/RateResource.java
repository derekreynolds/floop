/**
 * 
 */
package io.floop.web.rest;

import io.floop.rate.model.Rate;
import io.floop.rate.service.RateService;
import io.floop.security.SecurityUtils;
import io.floop.social.service.TwitterService;
import io.floop.web.rest.dto.UserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * @author reno
 *
 */
@RestController
@RequestMapping("/api")
public class RateResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final RateService rateService;
	   
	   @Autowired
	   public RateResource(final RateService rateService) {
		   this.rateService = rateService;
	   }
	   
	   @RequestMapping(value = "/rate/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Rate> get(@PathVariable String id) {
	        log.debug("REST request to get Rating : {}", id);	        
	        
	        return new ResponseEntity<>(rateService.getById(id), HttpStatus.OK);
	   }
	   

	    @RequestMapping(value = "/rate",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> saveAccount(@RequestBody Rate rate) {
	    	log.debug("Create a new rate.");	      
	    	
	        rateService.save(rate);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
}