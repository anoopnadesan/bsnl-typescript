module.exports = {
    dist_dir: 'dist',
    debug_dir: 'debug',
    livereload_port: 35729,
    app_files: {
        css: [ 'src/styles/**/*.css' ],
        html: [ 'src/**/*.html' ],
        ihtml: ['src/index.html']
    },
    test_files: {
        js: [
        ]
    },
    vendor_files: {
        js: [
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js"
        ],
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
        ],
        assets: [
        ]
    },
    assets: [
        'src/assets/**/*'
    ]
};