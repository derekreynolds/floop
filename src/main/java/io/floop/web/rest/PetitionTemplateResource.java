/**
 * 
 */
package io.floop.web.rest;

import io.floop.core.petition.model.PetitionTemplate;
import io.floop.core.petition.service.PetitionService;

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
public class PetitionTemplateResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final PetitionService petitionService;
	   
	   @Autowired
	   public PetitionTemplateResource(final PetitionService petitionService) {
		   this.petitionService = petitionService;
	   }
	   
	   @RequestMapping(value = "/petition/template/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<PetitionTemplate> get(@PathVariable String id) {
	        log.debug("REST request to get petition : {}", id);	        
	        
	        return new ResponseEntity<>(petitionService.getById(id), HttpStatus.OK);
	   }
	   
	   @RequestMapping(value = "/petition/template/top5",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<PetitionTemplate>> list(Pageable pageable) {
	        log.debug("REST request to get petition list");	        
	        
	        return new ResponseEntity<>(petitionService.getTop5(pageable), HttpStatus.OK);
	   }

	    @RequestMapping(value = "/petition/template",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> save(@RequestBody PetitionTemplate petitionTemplate) {
	    	log.debug("Create a new petition.");	      
	    	
	        petitionService.save(petitionTemplate);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
	    
	    @RequestMapping(value = "/petition/template",
	            method = RequestMethod.PUT,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> update(@RequestBody PetitionTemplate petitionTemplate) {
	    	log.debug("Create a new petition.");	      
	    	
	        petitionService.save(petitionTemplate);

	        return new ResponseEntity<>(HttpStatus.OK);
	        
	    }
}
