import React from 'react';
import {Timeline, Row, Col} from 'antd';
import _ from 'lodash';
import '../../style/mine/demo.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import getCssClss from '../constants/pub_fun.js';
import { withRouter } from 'react-router-dom';

const timeline_style = {
    item: {
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    subitem: {
        fontSize: '12px',
        fontWeight: 'normal',
        padding: '10px 0px',
        cursor: 'default'
    },
    //color 有没有公共的颜色库
    error: '#f5222d',
    warning: '#faad14',
    success: '#52c41a',
    info: '#1890ff',
}

//status 数据正常为1，警告为0，异常为-1, 小心为2，数据需要按照时间倒序
const timeline = [{
    step: '初步排除网络正常', //主时间轴时间节点轴文字描述
    time: '2015-09-01', //主时间轴时间节点显示时刻
    status: 1, //主时间轴时间状态（节点颜色）
    sub: [{ //子时间轴
        step: '初步排除网络正常', //子时间轴时间节点轴文字描述
        time: '2015-09-01', //子时间轴时间节点显示时刻
        status: 1, //子时间轴时间状态（节点颜色）
    }, {
        step: '初步排除网络异常',
        time: '2015-09-01',
        status: -1
    }, {
        step: '初步排除网络警告',
        time: '2015-09-01',
        status: 0
    }, {
        step: '初步排除网络异常',
        time: '2015-09-01',
        status: -1
    }]
}, {
    step: '初步排除网络异常',
    time: '2015-09-01',
    status: -1,
    sub: [{
        step: '初步排除网络正常',
        time: '2015-09-01',
        status: 1,
    }, {
        step: '初步排除网络异常',
        time: '2015-09-01',
        status: -1
    }, {
        step: '初步排除网络警告',
        time: '2015-09-01',
        status: 0
    }]
}, {
    step: '初步排除网络警告',
    time: '2015-09-01',
    status: 0,
    sub: [{
        step: '初步排除网络正常',
        time: '2015-09-01',
        status: 2,
    }, {
        step: '初步排除网络异常',
        time: '2015-09-01',
        status: 2
    }]
}, {
    step: '初步排除网络异常',
    time: '2015-09-01',
    status: 2,
    sub: [{
        step: '初步排除网络正常',
        time: '2015-09-01',
        status: 2,
    }]
}];

class SubTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: []
        }
    }

    componentDidMount(){
        let subs = document.getElementsByClassName('sub');
        let height = [];
        
        _.map(subs, (item, index)=>{
            height.push(item.offsetHeight);
            //注意此处一定要给每一个sub赋初始height值，否则首次高度为空字符串会造成动画卡顿
            item.style.height = item.offsetHeight+'px';
        });

        this.setState({
            height: height
        });
    }

    componentWillReceiveProps(nextProps){
        let { height } = this.state;

        console.log( height );
        
        if(nextProps.visible !== this.props.visible){
            let id = `sub_${nextProps.index}`;
            let sub = document.getElementById(id);

            if(nextProps.visible){
                sub.style.height = height[nextProps.index]+'px';
            }else{
                 sub.style.height = '0px';
             }
        }
    }

    render() {
        let {visible, index, subitem} = this.props;
        return (
            <div className={`animated ${visible ? 'fadeIn' : 'fadeOut'} sub`} id={`sub_${index}`}>
                <Timeline>
                    {
                        _.map(subitem, (item, index)=>{
                            return (
                                <Timeline.Item 
                                    color={item.status === 1 ? timeline_style.success : (item.status === 0 ? timeline_style.warning : (item.status === -1 ? timeline_style.error : timeline_style.info))}
                                    style={timeline_style.subitem} 
                                    key={index}
                                >
                                    <span style={{paddingRight: '20px'}}>{item.time}</span>{item.step}
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>

            </div>  
        )
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.ZoomOut = this.ZoomOut.bind(this);
    }

    componentDidMount() {
        let obj = document.querySelector('#json');
        let objStr = JSON.stringify(timeline, null, 4);
        let objStrHtml = objStr.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp'); 
       
        obj.innerHTML= objStrHtml;

        //发送ajax请求返回后得到的数据，进行处理
        _.map(timeline, (item) => {
            _.extend(item, {
                visible: true
            })
        });

        this.setState({
            timeline: timeline
        });

        //绑定键盘事件
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount(){
        //绑定键盘事件解除
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e){
        //如果按ESC键返回首页
        if(e.keyCode === 27){
            const path = '/app/search';
            this.props.history.push(path);
        }
    }

    handleClick = (index, e) => {
        let {timeline} = this.state;
        timeline[index].visible = !timeline[index].visible;

        this.setState({
            ...timeline
        });

        e.stopPropagation();
    }

    ZoomOut(){
        return `
            .zoom-enter {
                opacity: 1;
                transform: scale(1);
            }

            .zoom-enter.zoom-enter-active {
                opacity: 0.01;
                transform: scale(0.01); 
                transition: all 1000ms ease-in;
            }
            .zoom-leave {
                opacity: 0.01;
                transform: scale(0.01);
            }
            .zoom-leave.zoom-leave-active {
                opacity: 1;
                transform: scale(1);
                transition: all 1000ms ease-in;
            }
            .zoom-appear {
                opacity: 1;
                transform: scale(1);
            }
            .zoom-appear.zoom-appear-active {
                opacity: 0.01;
                transform: scale(0.01);
                transition: all 1000ms ease-in;
            }
        `
    }

    render() {
        let { timeline } = this.state;

        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: this.ZoomOut() }} />
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
                                <ul>
                                    <li>本页面共有2个组件，一个是 Timeline 组件，另一个是点击每个时间节点展示的 SubTimeline 组件。</li>
                                    <li>各时间节点颜色可控制。</li>
                                    <li>时间轴展示顺序可控制, 如有需求，可实现点击按钮正序倒序。</li>
                                    <li>当某时间节点并无子时间轴时，可以禁止点击该时间节点。</li>
                                </ul>
                                
                                <b>所需数据结构为：</b>
                                <code id="json" />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{margin: '40px auto'}}>
                                <Timeline>
                                    {
                                        //遍历进件进度数据，节点color可以根据条件判断
                                        //后期优化，没有sub禁止点击Timeline.Item
                                        _.map(timeline, (item, index) => {
                                            return (
                                                <Timeline.Item
                                                    color={item.status === 1 ? timeline_style.success : (item.status === 0 ? timeline_style.warning : timeline_style.error)}
                                                    style={timeline_style.item} key={index}
                                                >
                                                    <div onClick={this.handleClick.bind(this, index)}>
                                                        <span style={{paddingRight: '20px'}}>{item.time}</span>{item.step}
                                                    </div>
                                                    <SubTimeline visible={item.visible} index={index} subitem={item.sub} />
                                                </Timeline.Item>
                                            )
                                        })
                                    }
                                </Timeline>
                            </div>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default withRouter(Demo)