System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('src/main')
    .then(null, console.error.bind(console));