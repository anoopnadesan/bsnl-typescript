module.exports = {
    dist_dir: 'dist',
    debug_dir: 'debug',
    livereload_port: 35729,
    app_files: {
        css: [ 'src/styles/**/*.css' ],
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],
        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],
        html: [ 'src/index.html' ]
    },
    test_files: {
        js: [
        ]
    },
    vendor_files: {
        js: [
            'vendor/bower_components/jquery/dist/jquery.min.js',
            'vendor/bower_components/angular/angular.js',
            'vendor/bower_components/angular-resource/angular-resource.min.js',
            'vendor/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'vendor/bower_components/ui-router-extras/release/ct-ui-router-extras.min.js',
            'vendor/bower_components/slick-carousel/slick/slick.js'
        ],
        css: [
            'vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'vendor/bower_components/slick-carousel/slick/slick.css',
            'vendor/bower_components/slick-carousel/slick/slick-theme.css'
        ],
        assets: [
        ]
    },
    assets: [
        'src/assets/**/*'
    ]
};