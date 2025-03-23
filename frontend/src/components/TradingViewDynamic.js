// src/components/TradingViewDynamic.js
import React, { useEffect, useRef } from 'react';

const TradingViewDynamic = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // If the TradingView library isn't loaded yet, load it
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }

    function initWidget() {
      if (typeof window.TradingView === 'undefined' || !containerRef.current) return;

      // Clear any previous widget in this container
      containerRef.current.innerHTML = '';

      new window.TradingView.widget({
        container_id: containerRef.current.id,
        width: '100%',
        height: 500,
        symbol,                // e.g. "BINANCE:ADAUSDT" or "NASDAQ:TSLA"
        interval: '60',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false
      });
    }
  }, [symbol]);

  return (
    <div
      id="tradingview_dynamic_container"
      ref={containerRef}
      style={{ width: '100%', height: '500px', marginTop: '1rem' }}
    />
  );
};

export default TradingViewDynamic;