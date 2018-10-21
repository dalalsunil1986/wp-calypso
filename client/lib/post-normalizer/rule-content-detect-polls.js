/** @format */

/**
 * External dependencies
 */

import { forEach } from 'lodash';
import i18n from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import { domForHtml } from './utils';

function constructPollLink( pollId ) {
	const p = document.createElement( 'p' );
	p.innerHTML =
		'<a target="_blank" rel="external noopener noreferrer" href="https://poll.fm/' +
		pollId +
		'">' +
		i18n.translate( 'Take our poll' ) +
		'</a>';
	return p;
}

export default function detectPolls( post, dom ) {
	if ( ! dom ) {
		throw new Error( 'this transform must be used as part of withContentDOM' );
	}

	// Polldaddy embed markup isn't very helpfully structured, but we can look for the noscript tag,
	// which contains the information we need, and replace it with a paragraph.
	const noscripts = dom.querySelectorAll( 'noscript' );

	forEach( noscripts, noscript => {
		if ( ! noscript.firstChild ) {
			return;
		}

		// some browsers don't require this and let us query the dom inside a noscript. some do not. maybe just jsdom.
		const noscriptDom = domForHtml( noscript.innerHTML );

		// Check for poll.fm Crowdsignal polls
		const pollFmLink = noscriptDom.querySelector( 'a[href^="https://poll.fm/"]' );
		if ( pollFmLink ) {
			const pollFmPollId = pollFmLink.href.match( /https:\/\/poll.fm\/([0-9]+)/ )[ 1 ];
			if ( pollFmPollId ) {
				noscript.parentNode.replaceChild( constructPollLink( pollFmPollId ), noscript );
			}
		}

		// Check for old Polldaddy embeds too - polls created before Oct 2018 may still use them
		const pollDaddyLink =
			noscriptDom.querySelector( 'a[href^="http://polldaddy.com/poll/"]' ) ||
			noscriptDom.querySelector( 'a[href^="https://polldaddy.com/poll/"]' );
		if ( pollDaddyLink ) {
			const pollDaddyLinkPollId = pollDaddyLink.href.match(
				/https?:\/\/polldaddy.com\/poll\/([0-9]+)/
			)[ 1 ];
			if ( pollDaddyLinkPollId ) {
				noscript.parentNode.replaceChild( constructPollLink( pollDaddyLinkPollId ), noscript );
			}
		}
	} );

	return post;
}
