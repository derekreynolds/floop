/**
 * 
 */
package io.floop.core.vote.model;

import io.floop.common.model.FeedbackTemplate;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "VOTE_TEMPLATE")
public class VoteTemplate extends FeedbackTemplate {
    
    private List<VoteTemplateItem> items;


	/**
	 * @return the items
	 */
	public List<VoteTemplateItem> getItems() {
		return items;
	}

	/**
	 * @param item the items to set
	 */
	public void setItems(List<VoteTemplateItem> items) {
		this.items = items;
	}
    
    
	
}
