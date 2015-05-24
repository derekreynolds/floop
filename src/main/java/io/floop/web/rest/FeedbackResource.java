/**
 * 
 */
package io.floop.web.rest;

import io.floop.common.model.FeedbackTemplate;
import io.floop.common.service.FeedbackService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class FeedbackResource {

	   protected final Logger log = LoggerFactory.getLogger(getClass());

	   private final FeedbackService feedbackService;	   
	   
	   @Autowired
	   public FeedbackResource(final FeedbackService feedbackService) {
		   this.feedbackService = feedbackService;
	   }
	   
	   @RequestMapping(value = "/feedback",
	            method = RequestMethod.GET,
	            produces = MediaType.APPLICATION_JSON_VALUE)
	   @Timed
	   public ResponseEntity<Slice<FeedbackTemplate>> list(Pageable pageable) {
	        log.debug("REST request to get Voting list");        
	        	        
	        return new ResponseEntity<>(feedbackService.getList(pageable), HttpStatus.OK);
	   }

	
}
