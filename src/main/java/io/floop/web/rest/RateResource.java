/**
 * 
 */
package io.floop.web.rest;

import io.floop.common.service.GeoService;
import io.floop.core.rate.model.Rate;
import io.floop.core.rate.service.RateService;
import io.floop.web.util.WebUtil;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class RateResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final RateService rateService;
	   
	   private final GeoService geoService;
	   
	   @Autowired
	   public RateResource(final RateService rateService, final GeoService geoService) {
		   this.rateService = rateService;
		   this.geoService = geoService;
	   }
	   

	   @RequestMapping(value = "/rate",
			   method = RequestMethod.POST,
			   produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<?> save(@RequestBody Rate rate, HttpServletRequest request) {
		   log.debug("Create a new rate.");	      
			
		   if(rivate Location location;.)
		   
		   geoService.getIpAddressLocation(WebUtil.getClientIpAddress(request));
		   
		   rateService.save(rate);
		
		   return new ResponseEntity<>(HttpStatus.CREATED);
		    
	   }	    
	  
}
