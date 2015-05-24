/**
 * 
 */
package io.floop.core.rate.model;

import io.floop.common.model.FeedbackTemplate;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "RATE_TEMPLATE")
public class RateTemplate extends FeedbackTemplate {

    
    private List<RateTemplateItem> items;

    
	/**
	 * @return the items
	 */
	public List<RateTemplateItem> getItems() {
		return items;
	}

	/**
	 * @param item the items to set
	 */
	public void setItems(List<RateTemplateItem> items) {
		this.items = items;
	}   
    
	
}
