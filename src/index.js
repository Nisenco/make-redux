// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));

//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// 1 渲染数据 共享数据
/**
 * 问题1
 * 1 数据共享
 * 2 因为数据共享的原因 任何的函数都可更改数据，造成数据的不可控性，追溯问题难度大
 */
// function renderApp (appState) {
//   renderTitle(appState.title)
//   renderContent(appState.content)
// }
//
// function renderTitle (title) {
//   const titleDOM = document.getElementById('title')
//   titleDOM.innerHTML = title.text
//   titleDOM.style.color = title.color
// }
//
// function renderContent (content) {
//   const contentDOM = document.getElementById('content')
//   contentDOM.innerHTML = content.text
//   contentDOM.style.color = content.color
// }
// renderApp(appState)

/**
 * 2 为了解决 任何函数都能更改 共享数据，我们约定只能 用一种方法 更改数据 dispatch 函数
 *  function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}
 */

/***
 * 3 抽离 state 和dispatch 合并成 一个函数 并用观察者模式 更改state 后 直接渲染 页面
 *  function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
 */

/**
 * 4 纯函数
 *  1》 函数的返回结果 只依赖于输入参数
 *  2》 函数的执行没有副作用，不会更改外部数据
 */
const appState = {
    title:{
        text:'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
};

function renderApp (newAppState,oldAppState={}){
    if(newAppState === oldAppState) return ;
    renderTitle(newAppState.title);
    renderContent(newAppState.content);
}
function renderTitle(newTitle,oldTilte = {}){
    if(newTitle ===oldTilte )return ;
    const titleDom = document.getElementById('title');
    titleDom.innerHTML = newTitle.text;
    titleDom.style.color = newTitle.color;
}
function renderContent(newContent,oldContent={}){
    if(newContent === oldContent)return; // 判断是否变化，若不变直接返回
    const contentDOM  = document.getElementById('content');
    contentDOM.innerHTML = newContent.text;
    contentDOM.style.color = newContent.color;
}
function stateChanger (state,action){
    if(!state){
        return appState; // 不存在  state 直接作用初始值
    }
    switch(action.type){
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title:{
                    ...state.color,
                    text:action.text
                }
            };
            // state.title.text = action.text;
            // break;
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title:{
                    ...state.title,
                    color:action.color
                }
            };
            // state.title.color = action.color;
            // break;
        default:
            break;
    }
}
// dispatch({type:'UPDATE_TITLE_TEXT',text:'混蛋蛋'});
// dispatch({type:'UPDATE_TITLE_COLOR',text:'#6666'});

//抽离store
function creatStore(reducer){
    let state = null;
    const listeners = [];
    const subscribe = (listener)=>listeners.push(listener);
    const getState = ()=>state;
    const dispatch = (action)=>{
        state = reducer(state,action);
        listeners.map(listener=>listener());
    };
    dispatch({});
    return {
        getState,
        dispatch,
        subscribe
    }
}
const store = creatStore(stateChanger);
let oldState = store.getState();
store.subscribe(()=>{
    const newState = store.getState();
    renderApp (newState,oldState);
    oldState = newState;
}); // 订阅模式
renderApp (store.getState()); // 首次渲染
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'#6666'});
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }); // 修改标题文本
console.log(store.getState(),'store');
