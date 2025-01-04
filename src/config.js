const config = {
    port: process.env.PORT || 6902,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiGatewayUrl: process.env.API_GATEWAY_URL || 'http://localhost:6900/api/v1',
};

export default config;