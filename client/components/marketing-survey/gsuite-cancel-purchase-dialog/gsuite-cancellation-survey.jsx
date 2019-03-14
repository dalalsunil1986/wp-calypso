/** @format */

/**
 * External dependencies
 */
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import MultipleChoiceQuestion from 'components/multiple-choice-question';
import MultipleChoiceAnswer from 'components/multiple-choice-question/answer';

const GSuiteCancellationSurvey = ( { onSurveryAnswerChange, translate } ) => (
	<div className="gsuite-cancel-purchase-dialog__survey">
		<MultipleChoiceQuestion
			question={ translate( 'Please tell us why you are cancelling G Suite:' ) }
			onAnswerChange={ onSurveryAnswerChange }
		>
			<MultipleChoiceAnswer
				id={ 'too-expensive' }
				answerText={ translate( "It's too expensive." ) }
				textInput
			/>
			<MultipleChoiceAnswer
				id={ 'do-not-need-it' }
				answerText={ translate( "I don't need it." ) }
				textInput
			/>
			<MultipleChoiceAnswer
				id={ 'purchased-by-mistake' }
				answerText={ translate( 'I purchased it by mistake.' ) }
			/>
			<MultipleChoiceAnswer
				id={ 'it-did-not-work' }
				answerText={ translate( "It didn't work." ) }
			/>
			<MultipleChoiceAnswer
				id={ 'another-reason' }
				answerText={ translate( 'Another reason…' ) }
				doNotShuffle
				textInput
			/>
		</MultipleChoiceQuestion>
	</div>
);

GSuiteCancellationSurvey.propTypes = {
	onSurveryAnswerChange: PropTypes.func.isRequired,
	translate: PropTypes.func,
};

export default localize( GSuiteCancellationSurvey );
