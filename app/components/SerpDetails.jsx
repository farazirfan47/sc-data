// components/SerpDetails.js
"use client";
import React from 'react';
import { Box, Typography, Link, Paper, Chip, List, ListItem } from '@mui/material';

const SerpDetails = ({ serps }) => {
  return (
    <Box>
      {serps.map((serp) => (
        <Paper key={serp._id.$oid} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">SERP Details</Typography>
          <Typography><strong>Title:</strong> {serp.title}</Typography>
          <Typography><strong>Description:</strong> {serp.description}</Typography>
          <Typography>
            <strong>URL:</strong> <Link href={serp.url} target="_blank">{serp.url}</Link>
          </Typography>
          <Typography><strong>Breadcrumb:</strong> {serp.breadcrumb}</Typography>
          <Typography><strong>Rank Group:</strong> {serp.rank_group}</Typography>
          <Typography><strong>Rank Absolute:</strong> {serp.rank_absolute}</Typography>
          <Typography><strong>Content Parse Status:</strong> {serp.content_parse_status}</Typography>
          <Typography variant="subtitle1">Page Meta:</Typography>
          <pre>{JSON.stringify(serp.page_meta, null, 2)}</pre>
          <Typography variant="subtitle1">Business Models:</Typography>
          <List>
            {serp?.business_models?.map((model, index) => (
              <ListItem key={index}><Chip label={model} /></ListItem>
            ))}
          </List>
          <Typography variant="subtitle1">Website Types:</Typography>
          <List>
            {serp?.website_types?.map((type, index) => (
              <ListItem key={index}><Chip label={type} /></ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default SerpDetails;
