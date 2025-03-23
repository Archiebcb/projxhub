// frontend/src/components/TradingViewEmbed.js
import React, { useEffect, useRef } from 'react';

const TradingViewEmbed = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clear any existing children in the container
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_widget_container",
          width: "100%",
          height: "600",
          symbol: "BINANCE:XRPUSDT", // Change symbol as needed
          interval: "60",           // 60-minute interval; can be adjusted
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",               // Candlestick style
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
        });
      }
    };
    
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div 
      id="tradingview_widget_container" 
      ref={containerRef} 
      style={{ height: "600px", width: "100%" }} 
    />
  );
};

export default TradingViewEmbed;
