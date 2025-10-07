import React from 'react';

const Hero = () => {
  return (
    <section style={{
      padding: '48px 0',
      background: 'linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.15) 100%)',
      borderRadius: '0 0 16px 16px'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          FlavorFusion
        </h1>
        <p style={{ marginTop: 10, color: '#f1f5f9' }}>
          Discover, create, and share delicious recipes from around the world.
        </p>
      </div>
    </section>
  );
};

export default Hero;


