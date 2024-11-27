import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function PageContainer({ children }) {
    return (
        <Container>
            <Box sx={{ bgcolor: '#cfe8fc', height: '180vh' }}>{children}</Box>
        </Container>
    )
}

export default PageContainer