/**
 * 
 */
package io.floop.common.service;

import io.floop.common.model.FeedbackTemplate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

/**
 * @author Derek Reynolds
 *
 */
public interface FeedbackService {

	Slice<FeedbackTemplate> getList(Pageable pageable);
		
}
