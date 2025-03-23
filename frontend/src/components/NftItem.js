// src/components/NftItem.js
import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Buffer } from 'buffer';

// Build a proper IPFS gateway URL from an ipfs:// URI
function buildIpfsGatewayUrl(ipfsUri) {
  let noScheme = ipfsUri.replace('ipfs://', '');
  const slashIndex = noScheme.indexOf('/');
  if (slashIndex === -1) {
    return `https://ipfs.io/ipfs/${noScheme}`;
  }
  const cid = noScheme.slice(0, slashIndex);
  const rawPath = noScheme.slice(slashIndex + 1);
  const decodedPath = decodeURIComponent(rawPath);
  const reencodedPath = encodeURIComponent(decodedPath);
  return `https://ipfs.io/ipfs/${cid}/${reencodedPath}`;
}

// Fetch NFT metadata JSON from a URL (if needed)
async function fetchNftMetadata(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to fetch metadata');
    const json = await resp.json();
    console.log('Full JSON metadata:', json);
    return json.image || '';
  } catch (err) {
    console.error('Error fetching NFT metadata:', err);
    return '';
  }
}

// Decode hex-encoded NFT URI and return a proper URL
function decodeNftUri(hexUri) {
  try {
    const decoded = Buffer.from(hexUri, 'hex').toString('utf-8').trim();
    console.log('Raw decoded NFT URI:', decoded);
    if (decoded.startsWith('ipfs://')) {
      return buildIpfsGatewayUrl(decoded);
    }
    return decoded;
  } catch (err) {
    console.error('Error decoding NFT URI:', err);
    return '';
  }
}

export default function NftItem({ nft, index }) {
  const [imageLink, setImageLink] = useState('');
  const decodedUri = nft.URI ? decodeNftUri(nft.URI) : '';

  useEffect(() => {
    let isMounted = true;
    async function processUri() {
      if (!decodedUri) {
        if (isMounted) setImageLink('');
        return;
      }
      // If URI ends with .json, fetch JSON metadata for image
      if (decodedUri.endsWith('.json')) {
        const metaImage = await fetchNftMetadata(decodedUri);
        let finalLink = metaImage;
        if (finalLink.startsWith('ipfs://')) {
          finalLink = buildIpfsGatewayUrl(finalLink);
        }
        if (isMounted) setImageLink(finalLink);
      } else {
        if (isMounted) setImageLink(decodedUri);
      }
    }
    processUri();
    return () => { isMounted = false; };
  }, [decodedUri]);

  const hasImage = imageLink && (imageLink.startsWith('http://') || imageLink.startsWith('https://'));

  return (
    <Card>
      {hasImage ? (
        <CardMedia
          component="img"
          height="140"
          image={imageLink}
          alt={`NFT ${index + 1}`}
        />
      ) : (
        <CardContent>
          <Typography variant="body2">No direct image link</Typography>
          {decodedUri && (
            <Typography variant="caption">URI: {decodedUri}</Typography>
          )}
        </CardContent>
      )}
      <CardContent>
        <Typography variant="body2">Token ID: {nft.NFTokenID}</Typography>
      </CardContent>
    </Card>
  );
}