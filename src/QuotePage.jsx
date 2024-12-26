import React from 'react';
import './QuotePage.css'; // Create this CSS file for specific styling
import background from './img/Quote.jpg';

function QuotePage() {
  return (
    <div className="QuotePage">
      <div className='quoteImage' style={{ backgroundImage: `url(${background})` }}>
        <div className='MainQuote'>What is more liberating than creating art about instances that take place in our lives?</div>
      </div>
    </div>
  );
}

export default QuotePage;
