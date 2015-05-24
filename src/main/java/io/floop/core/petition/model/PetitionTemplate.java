/**
 * 
 */
package io.floop.core.petition.model;

import io.floop.common.model.FeedbackTemplate;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "PETITION_TEMPLATE")
public class PetitionTemplate extends FeedbackTemplate {
    
	
}
