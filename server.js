const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use('/certificates', express.static('certificates'));

// API endpoint to get certificates
app.get('/api/certificates', async (req, res) => {
    try {
        const certificatesDir = path.join(__dirname, 'certificates');
        const files = await fs.readdir(certificatesDir);
        
        const certificates = await Promise.all(files.map(async (file) => {
            if (file.endsWith('.json')) {
                const content = await fs.readFile(path.join(certificatesDir, file), 'utf8');
                const data = JSON.parse(content);
                return {
                    ...data,
                    imageUrl: `/certificates/${data.image}`,
                };
            }
            return null;
        }));

        // Filter out null values and sort by date
        const validCertificates = certificates
            .filter(cert => cert !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(validCertificates);
    } catch (error) {
        console.error('Error reading certificates:', error);
        res.status(500).json({ error: 'Failed to load certificates' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 