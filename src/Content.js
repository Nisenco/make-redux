import  React,{PureComponent}from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './ThemeSwitch';
import {connect} from "./assets/react-redux";
class Content extends PureComponent{
    static propTypes  = {
        themeColor: PropTypes.string
    };
    constructor(props){
        super(props);
        console.log(this.props,'this.props+++');
    }
    render() {
        return(<div style={{color:this.props.themeColor}}>
            <h1>React.js 小书内容</h1>
            <ThemeSwitch />
        </div>)
    }
}
const mapStateToProps = (state)=>{
    console.log(state,'++');
    return {
        themeColor:state.themeColor,
    }
};
// connect 函数返回一个函数  这个函数属于高阶组件
Content = connect(mapStateToProps)(Content);

export default Content;
