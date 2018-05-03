import React from 'react';
import { Input, Row, Col, message, Icon } from 'antd';
// import _ from 'lodash';
import '../../style/mine/demo.less';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Search = Input.Search;

class IndexSearch extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context){
        super(props, context);
        
        this.state = {
            error: false,
            searchValue: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.ZoomIn = this.ZoomIn.bind(this);
    }

    componentDidMount(){
        //绑定键盘事件
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount(){
        //绑定键盘事件解除
        window.removeEventListener('keydown', this.handleKeyDown);
    }

     
    handleSubmit(value){
        //校验进件号码是否有效
        //发起请求 参数value
        //如果请求数据失败或者请求数据为空，在本页提示
        if(value === ''){
            message.error('进件号不能为空，请输入正确的进件号', 3);
        }else{
            if(value === '2'){
                
                this.setState({
                    error: true
                })
            }else {
                this.setState({
                    error: false
                });
                //去掉value中多余的空格等
                //如果请求成功，跳转页面
                const path = `/app/demo/:${value}`;
                this.context.router.history.push(path);
            }
        }
    }

    handleKeyDown(e){
        if((e.keyCode>=48 && e.keyCode<=57)||(e.keyCode>=65 && e.keyCode<=90)){
            this.setState({
                searchValue: (this.state.searchValue).concat(e.key)
            })
        }

        if(e.keyCode === 8){
            this.setState({
                searchValue: (this.state.searchValue).substr(0, this.state.searchValue.length - 1)
            })
        }

        if(e.keyCode === 13){
            this.handleSubmit(this.state.searchValue);
        }
    }

    ZoomIn(){
        return `
            .zoom-enter {
                opacity: 0.01;
                transform: scale(0.01);
            }

            .zoom-enter.zoom-enter-active {
                opacity: 1;
                transform: scale(1); 
                transition: all 1000ms ease-in;
            }
            .zoom-leave {
                opacity: 1;
                transform: scale(1);
            }
            .zoom-leave.zoom-leave-active {
                opacity: 0.01;
                transform: scale(0.01);
                transition: all 1000ms ease-in;
            }
            .zoom-appear {
                opacity: 0.01;
                transform: scale(0.01);
            }
            .zoom-appear.zoom-appear-active {
                opacity: 1;
                transform: scale(1);
                transition: all 1000ms ease-in;
            }
        `
    }

    render(){ 
        let { error, searchValue } = this.state;
        return(
            <div>
                <style dangerouslySetInnerHTML={{ __html: this.ZoomIn() }} />
                <ReactCSSTransitionGroup
                    transitionName="zoom"
                    transitionAppear
                    transitionAppearTimeout={1000} 
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    component="div"
                >
                    <Row>
                        <Col span={12}>
                            <div>
                                <h2>Demo 说明：</h2>
                                <p>本页面共有1个组件，Search 组件。使用 ReactCSSTransitionGroup 制作页面进入动画效果。</p>
                                <p>流程如下：</p>
                                <ul>
                                    <li>键盘 0-9，a-z 按键可以自动输入进件号，无需点击搜索框。</li>
                                    <li>输入进件号后，点击回车键或者搜索 icon 进行搜索。</li>
                                    <li>校验进件号码是否有效。</li>
                                    <li>起请求 参数为 value。</li>
                                    <li>如果请求成功，跳转页面，路由为 /app/demo/:id</li>
                                    <li>如果请求数据失败或者请求数据为空，在本页提示。例如：可以尝试搜索 2</li>
                                </ul>
                                
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{width: '400px'}}> 
                                <p style={{
                                    fontSize: '16px',
                                    textAlign: 'center'}}
                                >请输入进件号</p>
                                <Search
                                    placeholder="请输入进件号"
                                    value={searchValue}
                                    onSearch={(value) => {this.handleSubmit(value)}}
                                    enterButton
                                    size="large" 
                                />
                                    <p style={{
                                            display: error ? 'block' : 'none',
                                            textAlign: 'center',
                                            marginTop: '40px',
                                            color: '#bfbfbf',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <Icon type="frown-o" style={{fontSize: '18px'}} /><span style={{paddingLeft: '10px'}}>暂时没有此进件消息，请核对进件号是否正确</span>
                                    </p>
                            </div>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default withRouter(IndexSearch)