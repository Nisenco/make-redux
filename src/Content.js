import  React,{PureComponent}from 'react';
import ThemeSwitch from './ThemeSwitch';
import ThemeProvider from './ThemeProvider';
import {connect} from "./assets/react-redux";
class Content extends PureComponent{
    render() {
        return(
            <div style={{color:this.props.themeColor}}>
            <h1>React.js 小书内容</h1>
            <ThemeSwitch />
        </div>)
    }
}
Content.contextType = ThemeProvider;
const mapStateToProps = (state)=>{
    return {
        themeColor:(state&& state.themeColor) || 'blue',
    }
};
// connect 函数返回一个函数  这个函数属于高阶组件
Content = connect(mapStateToProps)(Content);
export default Content;
