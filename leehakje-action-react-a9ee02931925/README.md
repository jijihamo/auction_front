This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [설치법](#설치)

## 설치

https://github.com/kjk7034/create-react-app-typescript/blob/master/README.SetupProcess.md#prettiereditor-is-vscode

https://github.com/kjk7034/create-react-app-typescript

https://github.com/kjk7034/create-react-app-typescript/blob/master/README.SetupProcess.md

webstrom 구분해서 사용하기

https://techstory.shma.so/eslint-with-webstorm-bf9d418993b2
———————————————————————————————————

https://velopert.com/3671

미설치시 (npm install -g create-react-app)

create-react-app 사용하기 *

react-scripts-ts 사용할려면 처음부터 (create-react-app project_name --scripts-version=react-scripts-ts)

웹스톰으로 이용시 그냥 create react app 으로 실행하면 된다

———————————————————————————————————

npm install -g create-react-app - 설치를 해줘야 한다

설치를 해주면 기존 webpack+react 와 달리 

package.json에 babel / webpack 등의 dependency(의존) package 들은 node_modules/react-scripts 에
설치되어있기에 여기서 보이지 않습니다. 그렇기 때문에 eject 를 사용해야 한다.

———————————————————————————————————

eject 사용하기

이 “도구“에선 커스터마이징이 불가능합니다. 엥? 그럼 어쩌라구요!

이 도구의 개발자는 그렇게 사용자들을 ‘그 환경에 가둬놓으면’ 안되는걸 알기 때문에 이를 대비하여 eject라는 기능을 만들어줬습니다.

이 기능의 역할은 현재 프로젝트의 모든 설정 / 스크립트를 여러분의 프로젝트로 옮겨줍니다. eject를 하고나서는, 여러분 마음대로 커스터마이징이 가능합니다.

* `yarn eject`

이 명령어가 사용되면, 스크립트를 통하여 react-scripts 를 제거합니다.

그리고, react-scripts 에서 사용하던 스크립트들을 그대로 여러분들의 프로젝트에 생성합니다.
package.json 이 처음과 다르게 변해있음 가장 기본적인 리액트 앱 그리고 빌드해야 함

* `yarn install` -> 빌드됨

기본 설정 (package.json -> build.js 아웃풋 js)

———————————————————————————————————

typescript  사용하기

* `yarn add -D typescript`

- 추가

———————————————————————————————————

코드 분할

코드 분할을 해서 현재 필요한 것만 Lazy-load 할 수 있어 앱의 성능을 향상시키기 위해서 사용.

React 공식 사이트에 있는 React Loadable을 사용. - 구체적인 사용법 모름

* `yarn add react-loadable`
* `yarn add -D @types/react-loadable`

———————————————————————————————————

Adding HMR

기본적으로 hot reload가 설정되어 있지만 HMR(Hot Module Replacement)을 사용하기 위하여 다음과 같이 진행. module.hot 에러를 해결하기 위해서 @types/webpack-env 추가

* `yarn add @types/webpack-env -D`

index.js에 다음과 같은 내용 추가

if (module.hot) {
   module.hot.accept('./App', () => {
     ReactDOM.render(<App />, document.getElementById('root'))
   })
}

———————————————————————————————————

npm install --save-dev eslint-config-airbnb

eslint 는 react app 에 포함되어 있다 

다만 사용하려면 web storm 설정에서 eslint enable 을 해줘야 한다. 

* `.eslintrc
   {
     "env": {
       "browser": true,
       "es6": true
     },
     "parser": "babel-eslint",
     "extends": "airbnb",
     "rules": {
       "react/jsx-filename-extension": 0,
       "indent": 0,
       "no-tabs": 0,
       "semi": 0,
       "function-paren-newline": 0,
       "react/prefer-stateless-function": "off"
     }
}`


———————————————————————————————————

웹스톰에는 prettier 플러그인은 기본 설치되어 있다

* `yarn add --dev prettier-eslint`

https://prettier.io/docs/en/webstorm.html

file watcher를 통해서 했는데 되는진 모르겠다.

———————————————————————————————————

* `yarn add react-router-dom`
* `yarn add -D @types/react-router-dom`
———————————————————————————————————

* `npm install axios`
* `npm install axios-cancel --save`

———————————————————————————————————

각각 필요한거

* `yarn add babel-preset-es2015 redux react-redux  prop-types babel-polyfill babel-preset-stage-0`

———————————————————————————————————

https://medium.com/@khwsc1/react%EC%97%90-%EA%B0%84%ED%8E%B8%ED%95%98%EA%B2%8C-bootstrap-4%EB%A5%BC-%EB%8B%AC%EC%95%84%EB%B3%B4%EC%9E%90-fdb646904363

* `npm install --save reactstrap react react-dom`

———————————————————————————————————

* `npm install react-js-pagination`

———————————————————————————————————