import webpack from 'webpack'
import path from 'path'
import {build, BuildPaths, BuildOptions, BuildMode} from '@packages/build-config'
import packageJson from './package.json'

type Mode = "production" | "development"

interface EnvVariables {
    mode: Mode,
    port: number,
    SHOP_REMOTE_URL: string,
    ADMIN_REMOTE_URL: string
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
        port: env.port,
        mode: env.mode,
        paths,
    })

    const SHOP_REMOTE_URL:Readonly<string> = env.SHOP_REMOTE_URL ?? 'http://localhost:3001', ADMIN_REMOTE_URL:Readonly<string> = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
            admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
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