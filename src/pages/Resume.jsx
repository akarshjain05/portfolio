import React from 'react';

export default function Resume() {
  return (
    <div className="page" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <iframe 
        src="/Resume.pdf" 
        title="Resume" 
        width="100%" 
        height="100%" 
        style={{ border: 'none', flex: 1 }}
      />
    </div>
  );
}
