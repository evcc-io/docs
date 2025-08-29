import React from 'react';
import Link from '@docusaurus/Link';

export default function NavCard({ to, title, description, fullWidth = false, highlight = false }) {
  return (
    <Link 
        className="card padding--lg" 
        to={to}
        style={{
          display: 'block',
          height: '100%',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 'var(--ifm-card-border-radius)',
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          textDecoration: 'none',
          gridColumn: fullWidth ? '1 / -1' : 'auto',
          backgroundColor: 'var(--ifm-card-background-color)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
        }}
      >
        <h3 style={{ color: 'var(--ifm-color-primary)' }}>{title}</h3>
        <p style={{ 
          marginBottom: 0,
          color: highlight 
            ? 'var(--ifm-color-primary)' 
            : 'var(--ifm-font-color-secondary)'
        }}>{description}</p>
      </Link>
  );
}