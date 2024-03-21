import path from 'path';
import { buildWebpack } from '@packages/build-config';
import webpack, { Configuration } from 'webpack';
import packageJson from './package.json';

import type {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from '@packages/build-config';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  isAnalyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const config: Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    paths,
    isAnalyzer: env.isAnalyzer,
    platform: env.platform ?? 'desktop',
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './router': './src/router/router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
  );

  return config;
};
