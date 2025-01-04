const config = {
    port: process.env.REACT_APP_PORT || 6902,
    nodeEnv: process.env.NODE_ENV || 'development',
    browserRooterUrl: process.env.REACT_APP_BROWSER_ROOTER_URL || '',
    apiGatewayUrl: process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:6900/api/v1',
};

export default config;