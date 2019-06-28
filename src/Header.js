import  React,{PureComponent}from 'react';
import { connect } from './assets/react-redux';
class Header extends PureComponent{
    render() {
        console.log(this.props,'this.props-header');
        const {themeColor,text} = this.props;
        return(<div>
            <h1 style={{color:themeColor}} >React.js 小书{text}</h1>
        </div>)
    }
}
const mapStateToProps = (state)=>{
    console.log(state,'state--header');
    return {
        themeColor:state.themeColor,
    }
};
// connect 函数返回一个函数  这个函数属于高阶组件
Header = connect(mapStateToProps)(Header);
export default Header;
