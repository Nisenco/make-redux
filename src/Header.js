import  React,{PureComponent}from 'react';
import PropTypes from 'prop-types';
import { connect } from './assets/react-redux';
class Header extends PureComponent{
    static propTypes = {
        themeColor: PropTypes.string
    };
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props,'this.props_header');
        console.log(this.context,'this.context-header');
        return(<div>
            <h1 style={{color:this.props.themeColor}}>React.js 小书</h1>
        </div>)
    }
}
const mapStateToProps = (state)=>{
    console.log(state,'header-');
    return {
        themeColor:(state && state.themeColor) || 'red',
    }
};
// connect 函数返回一个函数  这个函数属于高阶组件
Header = connect(mapStateToProps)(Header);
export default Header;
