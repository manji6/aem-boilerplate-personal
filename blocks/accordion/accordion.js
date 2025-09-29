/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

import { sendCustomEvent } from '../../scripts/scripts.js';

export default function decorate(block) {
    [...block.children].forEach((row, index) => {
      // decorate accordion item label
      const label = row.children[0];
      const summary = document.createElement('summary');
      summary.className = 'accordion-item-label';
      summary.append(...label.childNodes);
      
      // decorate accordion item body
      const body = row.children[1];
      body.className = 'accordion-item-body';
      
      // decorate accordion item
      const details = document.createElement('details');
      details.className = 'accordion-item';
      details.dataset.accordionIndex = index;
      details.append(summary, body);
      
      // Add click event listener for accordion toggle
      details.addEventListener('toggle', (e) => {
        const isOpen = e.target.open;
        const accordionId = `accordion-${block.id || 'default'}-item-${index}`;
        
        // Send ACDL event for accordion toggle
        sendCustomEvent(
          e,
          'accordion-toggle',
          'accordion',
          accordionId,
          {
            blockType: 'accordion',
            action: isOpen ? 'open' : 'close',
            accordionIndex: index,
            accordionTitle: summary.textContent?.trim() || '',
            isOpen: isOpen
          }
        );
      });
      
      row.replaceWith(details);
    });

    // Send ACDL event for accordion initialization
    sendCustomEvent(
      null,
      'accordion-init',
      'accordion',
      `accordion-${block.id || 'default'}`,
      {
        blockType: 'accordion',
        totalItems: block.children.length
      }
    );
  }