const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const recursive = require('recursive-fs');

const pinDirectoryToIPFS = async () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = './out';
    const apiKey = 'a515b56f93360e9a304a';
    const secretKey = 'ea53ec5528e3f9adf1fb7f8b802444efe047e2dd0f52eaa7514f2222b9b931bc';

    try {
        const { files } = await recursive.readdirr(src);
        const data = new FormData();

        files.forEach((file) => {
            data.append('file', fs.createReadStream(file), {
                filepath: `out/${path.relative(src, file)}`
            });
        });

        const metadata = JSON.stringify({
            name: 'clawfarm-site',
        });
        data.append('pinataMetadata', metadata);

        const response = await axios.post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': apiKey,
                'pinata_secret_api_key': secretKey
            }
        });

        console.log('SUCCESS: Deployed to IPFS');
        console.log('CID:', response.data.IpfsHash);
        console.log('URL: https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash);
    } catch (error) {
        console.error('ERROR:', error.message);
        if (error.response) {
            console.error(error.response.data);
        }
        process.exit(1);
    }
};

pinDirectoryToIPFS();
