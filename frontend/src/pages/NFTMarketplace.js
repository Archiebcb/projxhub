// src/pages/NFTMarketplace.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import { Client } from 'xrpl';
import NFTCreator from './NFTCreator';

// Helper component for tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nft-marketplace-tabpanel-${index}`}
      aria-labelledby={`nft-marketplace-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const NFTMarketplace = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Manage tab state: 0 = Browse NFTs, 1 = Create NFT
  const [tabValue, setTabValue] = useState(0);

  const fetchNFTOffers = async () => {
    setLoading(true);
    try {
      // Connect to XRPL mainnet
      const client = new Client('wss://s1.ripple.com');
      await client.connect();

      let fetchedOffers = [];
      let marker = undefined;
      // Note: nft_sell_offers requires an nft_id. For a global listing,
      // you'll need an aggregator or a list of known accounts.
      // Here we use a dummy nft_id to simulate an error and fallback.
      const request = {
        command: 'nft_sell_offers',
        nft_id: '0000000000000000000000000000000000000000000000000000000000000000'
      };
      const response = await client.request(request);
      if (response.result && response.result.offers) {
        fetchedOffers = fetchedOffers.concat(response.result.offers);
      } else {
        throw new Error('No offers returned.');
      }
      await client.disconnect();
      setOffers(fetchedOffers);
    } catch (err) {
      console.error('Error fetching NFT offers:', err);
      setError('Failed to fetch NFT offers from XRPL. Showing simulated offers instead.');
      // Fallback simulated data
      const simulatedOffers = [
        { amount: '25000000', Account: 'rDummySeller1' },
        { amount: '50000000', Account: 'rDummySeller2' },
        { amount: '75000000', Account: 'rDummySeller3' }
      ];
      setOffers(simulatedOffers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabValue === 0) {
      fetchNFTOffers();
    }
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const convertDropsToXRP = (drops) => (parseFloat(drops) / 1000000).toFixed(6);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        NFT Marketplace
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="NFT Marketplace Tabs">
        <Tab label="Browse NFTs" />
        <Tab label="Create NFT" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {loading && <CircularProgress />}
        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {!loading && offers.length === 0 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            No NFT offers available at this time.
          </Typography>
        )}
        <Grid container spacing={2}>
          {offers.map((offer, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    NFT Sell Offer {idx + 1}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> {convertDropsToXRP(offer.amount)} XRP
                  </Typography>
                  <Typography variant="body2">
                    <strong>Seller:</strong> {offer.Account}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                    Buy NFT
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <NFTCreator />
      </TabPanel>
    </Box>
  );
};

export default NFTMarketplace;