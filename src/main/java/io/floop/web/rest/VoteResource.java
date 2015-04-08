/**
 * 
 */
package io.floop.web.rest;

import io.floop.core.vote.model.Vote;
import io.floop.core.vote.service.VoteService;
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
public class VoteResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final VoteService voteService;
	   
	   @Autowired
	   public VoteResource(final VoteService voteService) {
		   this.voteService = voteService;
	   }
	   
	   @RequestMapping(value = "/vote/{id}",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Vote> get(@PathVariable String id) {
	        log.debug("REST request to get Rating : {}", id);	        
	        
	        return new ResponseEntity<>(voteService.getById(id), HttpStatus.OK);
	   }
	   
	   @RequestMapping(value = "/vote/top5",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<Vote>> list(Pageable pageable) {
	        log.debug("REST request to get Voting list");	        
	        
	        return new ResponseEntity<>(voteService.getTop5(pageable), HttpStatus.OK);
	   }

	    @RequestMapping(value = "/vote",
	            method = RequestMethod.POST,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> save(@RequestBody Vote vote) {
	    	log.debug("Create a new vote.");	      
	    	
	        voteService.save(vote);

	        return new ResponseEntity<>(HttpStatus.CREATED);
	        
	    }
	    
	    @RequestMapping(value = "/vote",
	            method = RequestMethod.PUT,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	    @Timed
	    public ResponseEntity<?> update(@RequestBody Vote vote) {
	    	log.debug("Create a new vote.");	      
	    	
	        voteService.save(vote);

	        return new ResponseEntity<>(HttpStatus.OK);
	        
	    }
}
