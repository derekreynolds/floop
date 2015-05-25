/**
 * 
 */
package io.floop.core.petition.model;

import io.floop.common.model.FeedbackTemplate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * @author Derek Reynolds
 *
 */
@Document(collection = "PETITION_TEMPLATE")
public class PetitionTemplate extends FeedbackTemplate {
    
	@Field("button_text")
	private String buttonText;

	/**
	 * @return the buttonText
	 */
	public String getButtonText() {
		return buttonText;
	}

	/**
	 * @param buttonText the buttonText to set
	 */
	public void setButtonText(String buttonText) {
		this.buttonText = buttonText;
	}
	
		
}
