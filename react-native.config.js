module.exports = {
    assets: ['./src/assets/fonts'], // Asegúrate de que la ruta coincida con donde almacenaste tus fuentes
    project: {
        ios: {},
        android: {},
    },
    dependencies: {
        'react-native-vector-icons': {
            platforms: {
                ios: null,
            },
        },
    },
    assets: [
        './node_modules/react-native-international-phone-number/assets/fonts',
    ],
};