const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 프로젝트 진입점 설정 
  entry: './src/index.tsx',

  // 빌드 결과물 설정 (dist 폴더에 번들링된 파일 생성)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 파일 확장자 처리 설정 (.ts, .tsx, .js 확장자를 인식)
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  // TypeScript 및 JSX 파일들을 로더를 통해 처리
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts 또는 .tsx 파일을 대상으로 함
        use: 'ts-loader', // TypeScript 파일을 JavaScript로 변환
        exclude: /node_modules/, // node_modules는 처리하지 않음
      },
    ],
  },

  // HTML 파일을 번들에 포함시키는 플러그인 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 템플릿 파일 위치
    }),
  ],

  // 개발 서버 설정 (핫 리로딩 포함)
  devServer: {
    contentBase: './dist', // 개발 서버의 파일 경로
    hot: true, // 코드 변경 시 자동으로 페이지 새로고침
  },
};