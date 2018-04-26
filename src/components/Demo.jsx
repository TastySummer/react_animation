import React from 'react';
import {Timeline} from 'antd';
import _ from 'lodash';
import '../style/mine/demo.less'

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

//status 数据正常为1，警告为0，异常为-1, 数据需要按照时间倒序
const timeline = [{
    step: '初步排除网络正常',
    time: '2015-09-01',
    status: 1
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
}];

class SubTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount(){
        let sub = document.getElementsByClassName('sub')[0]
        Object.assign(sub.style, {
            transition: 'height 0.6s ease-in-out'
        });
        this.setState({
            height: sub.height
        })
    }

    componentWillReceiveProps(nextProps){
        let { height } = this.state;
        if(nextProps.visible != this.props.visible){
            let id = `'sub_'+${nextProps.index}`;
            let sub = document.getElementById(id);

             if(nextProps.visible){
                 Object.assign(sub.style, {
                     height: '114px'
                 })
             }else{
                 Object.assign(sub.style, {
                     height: '0px'
                 })
             }
        }
    }

    render() {
        let {visible, index} = this.props;
        return (
            <div className={`animated ${visible ? 'fadeIn' : 'fadeOut'} sub`} id={`'sub_'+${index}`}>
                <Timeline>
                        <Timeline.Item style={timeline_style.subitem} color={timeline_style.info}>
                            创建服务现场
                            2015-09-01
                        </Timeline.Item>
                        <Timeline.Item style={timeline_style.subitem} color={timeline_style.info}>
                            初步排除网络异常
                            2015-09-01
                        </Timeline.Item>
                        <Timeline.Item style={timeline_style.subitem} color={timeline_style.info}>
                            技术测试异常
                            2015-09-01
                        </Timeline.Item>
                    </Timeline>

            </div>
        )
    }

}

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //发送ajax请求返回后得到的数据，进行处理
        _.map(timeline, (item) => {
            _.extend(item, {
                visible: true
            })
        });

        this.setState({
            timeline: timeline
        })
    }

    handleClick = (index, e) => {
        let {timeline} = this.state;
        timeline[index].visible = !timeline[index].visible;

        this.setState({
            ...
                timeline
        });

        e.stopPropagation();
    }


    render() {
        let {timeline} = this.state;

        return (
            <div style={{
                width: '20%',
                margin: '40px auto'
            }}>
                <div>
                    <h2>Demo 说明：</h2>

                </div>
                <Timeline>
                    {
                        //遍历进件进度数据，节点color可以根据条件判断
                        _.map(timeline, (item, index) => {
                            return (
                                <Timeline.Item
                                    color={item.status == 1 ? timeline_style.success : (item.status == 0 ? timeline_style.warning : timeline_style.error)}
                                    style={timeline_style.item} key={index}>
                                    <div onClick={this.handleClick.bind(this, index)}>
                                        <span style={{paddingRight: '20px'}}>{item.time}</span>{item.step}
                                    </div>
                                    <SubTimeline visible={item.visible} index={item.index}/>
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
            </div>
        )
    }
}