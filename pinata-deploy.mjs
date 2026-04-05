import pinataSDK from '@pinata/sdk';
import path from 'path';

const apiKey = 'a515b56f93360e9a304a';
const apiSecret = 'ea53ec5528e3f9adf1fb7f8b802444efe047e2dd0f52eaa7514f2222b9b931bc';
const pinata = new pinataSDK(apiKey, apiSecret);

const sourcePath = './out';
const options = {
    pinataMetadata: {
        name: 'clawfarm-site-ipfs',
    },
    pinataOptions: {
        cidVersion: 0
    }
};

try {
    const result = await pinata.pinFromFS(sourcePath, options);
    console.log('SUCCESS: Deployed to IPFS');
    console.log('CID:', result.IpfsHash);
    console.log('URL: https://gateway.pinata.cloud/ipfs/' + result.IpfsHash);
} catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
}
