/**
 * 
 */
package io.floop.core.gauge.model;

import io.floop.common.model.FeedbackTemplate;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "GAUGE_TEMPLATE")
public class GaugeTemplate extends FeedbackTemplate implements Serializable {

    
    private GaugeTemplateItem item;
   
	/**
	 * @return the item
	 */
	public GaugeTemplateItem getItem() {
		return item;
	}

	/**
	 * @param item the item to set
	 */
	public void setItem(GaugeTemplateItem item) {
		this.item = item;
	}
	
}
