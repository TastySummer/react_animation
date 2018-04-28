import React from 'react';
import { Input, Row, Col, message, Icon } from 'antd';
import _ from 'lodash';
import '../style/mine/demo.less';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Search = Input.Search;

class IndexSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.getCssClss = this.getCssClss.bind(this);
    }

    componentDidMount(){
        //绑定键盘事件
        window.addEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(e){
        //如果按ESC键返回首页
        if(e.keyCode === 27){
            const path = '/app/dashboard/index';

            this.props.history.push(path);
        }
    }
     
    handleSubmit(value){
        //校验进件号码是否有效
        //发起请求 参数value
        //如果请求数据失败或者请求数据为空，在本页提示
        if(value == 2){
            // message.error('暂时没有此进件消息，请核对进件号是否正确', 3);
            this.setState({
                error: true
            })
        }else {
            this.setState({
                error: false
            })
            //如果请求成功，跳转页面
            const path = `/app/demo/:${value}`;
            this.props.history.push(path);
        }
    }

    getCssClss(){
        return `
            .example-enter {
                opacity: 0.01;
                transform: scale(0.01);
            }

            .example-enter.example-enter-active {
                opacity: 1;
                transform: scale(1); 
                transition: all 1000ms ease-in;
            }
            .example-leave {
                opacity: 1;
                transform: scale(1);
            }
            .example-leave.example-leave-active {
                opacity: 0.01;
                transform: scale(0.01);
                transition: all 1000ms ease-in;
            }
            .example-appear {
                opacity: 0.01;
                transform: scale(0.01);
            }
            .example-appear.example-appear-active {
                opacity: 1;
                transform: scale(1);
                transition: all 1000ms ease-in;
            }
        `
    }

    render(){ 
        let { error } = this.state;
        return(
            <div>
                <style dangerouslySetInnerHTML={{ __html: this.getCssClss() }} />
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col span={12}>
                            <div>
                                <h2>Demo 说明：</h2>
                                <p>本页面共有1个组件，Search 组件。使用 ReactCSSTransitionGroup 制作页面进入动画效果。</p>
                                <p>流程如下：</p>
                                <ul>
                                    <li>输入进件号后，点击回车键或者搜索 icon 进行搜索。</li>
                                    <li>校验进件号码是否有效。</li>
                                    <li>起请求 参数为 value。</li>
                                    <li>如果请求成功，跳转页面，路由为 /app/demo/:id</li>
                                    <li>如果请求数据失败或者请求数据为空，在本页提示。例如：可以尝试搜索 2</li>
                                </ul>
                                
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{
                                width: '400px',
                                // position: 'absolute',
                                // left: '50%',
                                // top: '50%',
                                // marginLeft: '-100px'          
                            }}> 
                                <p style={{
                                    fontSize: '16px',
                                    textAlign: 'center'
                                }}>请输入进件号</p>
                                <Search
                                    placeholder="Please input search id..."
                                    onSearch={(value) => {this.handleSubmit(value)}}
                                    enterButton
                                    size="large" />
                                    <p style={{
                                        display: error ? 'block' : 'none',
                                        textAlign: 'center',
                                        marginTop: '40px',
                                        color: '#bfbfbf',
                                        fontSize: '14px'
                                    }}>
                                        <Icon type="frown-o" style={{fontSize: '18px'}}/><span style={{paddingLeft: '10px'}}>暂时没有此进件消息，请核对进件号是否正确</span>
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