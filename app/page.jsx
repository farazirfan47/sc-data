'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal
} from '@mui/material';

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openSerps, setOpenSerps] = useState(false);
  const [openVolume, setOpenVolume] = useState(false);
  const [selectedSerps, setSelectedSerps] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenSerps = (serps) => {
    setSelectedSerps(serps);
    setOpenSerps(true);
  };

  const handleCloseSerps = () => {
    setOpenSerps(false);
    setSelectedSerps([]);
  };

  const handleOpenVolume = (volume) => {
    setSelectedVolume(volume);
    setOpenVolume(true);
  };

  const handleCloseVolume = () => {
    setOpenVolume(false);
    setSelectedVolume([]);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', padding: 4 }}>
      <Container>
        <Typography variant="h4" sx={{ marginY: 4, color: "black" }}>Landscape Data</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#333', color: 'white' }}>
                {Object.keys(data[0]).map((key) => (
                  key !== 'serps' && key !== 'monthly_search_volume' && key != "location" && key !== "_id" && (
                    <TableCell key={key} sx={{ fontWeight: 'bold', color: 'white' }}>{key}</TableCell>
                  )
                ))}
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SERPS</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MSV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item._id.$oid}>
                  {Object.keys(item).map((key) => (
                    key !== 'serps' && key !== 'monthly_search_volume' && key != "location" && key !== "_id" && <TableCell key={key}>{JSON.stringify(item[key])}</TableCell>
                  ))}
                  <TableCell>
                    <Button onClick={() => handleOpenSerps(item.serps)}>
                      View SERPs
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenVolume(item.monthly_search_volume)}>
                      View MSV
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 4 }}>
          <Pagination
            count={Math.ceil(data.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
      <Modal
        open={openSerps}
        onClose={handleCloseSerps}
        aria-labelledby="serps-modal-title"
        aria-describedby="serps-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxHeight: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 2, overflowY: 'auto' }}>
          <Typography id="serps-modal-title" variant="h6" component="h2">
            SERPs Data
          </Typography>
          <Box id="serps-modal-description" sx={{ mt: 2 }}>
            {selectedSerps.length ? (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(selectedSerps[0]).map((key) => (
                        key !=="_id" && key !== "landscape_id" && key != "keyword_id" && <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedSerps.map((serp, index) => (
                      <TableRow key={index}>
                        {Object.keys(serp).map((key) => (
                           key !=="_id" && key !== "landscape_id" && key != "keyword_id" && <TableCell key={key}>{JSON.stringify(serp[key])}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No SERPs data available.</Typography>
            )}
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openVolume}
        onClose={handleCloseVolume}
        aria-labelledby="volume-modal-title"
        aria-describedby="volume-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxHeight: '90%', bgcolor: 'background.paper', boxShadow: 24, p: 2, overflowY: 'auto' }}>
          <Typography id="volume-modal-title" variant="h6" component="h2">
            Monthly Search Volume Data
          </Typography>
          <Box id="volume-modal-description" sx={{ mt: 2 }}>
            {selectedVolume.length ? (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(selectedVolume[0]).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedVolume.map((volume, index) => (
                      <TableRow key={index}>
                        {Object.keys(volume).map((key) => (
                          <TableCell key={key}>{JSON.stringify(volume[key])}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No Monthly Search Volume data available.</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
