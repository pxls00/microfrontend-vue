import webpack from 'webpack'
import path from 'path'
import {build, BuildPaths, BuildOptions, BuildMode} from '@packages/build-config'
import packageJson from './package.json'

type Mode = "production" | "development"

interface EnvVariables {
    mode: Mode,
    port: number
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        copyFolders: [{from: path.resolve(__dirname, 'public', 'fonts'), to: path.resolve(__dirname, 'build', 'fonts')}]
    }

    const config: webpack.Configuration = build({
        port: 3001,
        mode: env.mode,
        paths
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop',
        filename: 'remoteEntry.js',
        exposes: {
            './router': './src/router/index.ts'
        },
        shared: {
            ...packageJson.dependencies,
            vue: {
                eager: true,
                requiredVersion: packageJson.dependencies['vue']
            },
            'vue-router': {
                eager: true,
                requiredVersion: packageJson.dependencies['vue-router']
            }
        }
    }))

    return config
}