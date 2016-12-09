//dependence
import React, {Component, PropTypes} from 'react';
import { Modal, Button, message } from 'antd';

//css
import style from './index.css';

//constants


class InsertVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: ''
        }
    }


    onCancel = () => {
        this.refs.videoArea.innerHTML = '';
        this.refs.videoUrl.value = '';
        this.setState(Object.assign({}, this.state, {videoUrl: ''}));
        this.props.onCancel();
    }


    modalHandleOk = () => {
        this.refs.videoArea.innerHTML = '';
        this.refs.videoUrl.value = '';      
        const reg = /^https?.+\.(avi|flv|mp4)$/i;
        if(reg.test(this.state.videoUrl)){
            this.props.onConfirm(this.state.videoUrl);
        } 
        else{
            this.props.onCancel();
        }
        this.setState(Object.assign({}, this.state, {videoUrl: ''}));       
    }


    videoUrlChange = () => {
        const videoUrl = this.refs.videoUrl.value;
        const reg = /^https?.+\.(avi|flv|mp4)$/i;
        if(reg.test(videoUrl)){
            this.setState(Object.assign({}, this.state, {videoUrl: videoUrl})); 
            this.refs.videoArea.innerHTML = '<video controls="controls" preload="preload" ref="myVideo">'
                                                + '<source src="' + videoUrl + '" type="video/mp4" ref="videoSouce" />'
                                            + '</video>';
        }
        else{
            message.error('视频地址无效')
        }        
    }

    render() {
        const { visible, title} = this.props;     

        return (
            <div>
                <Modal 
                width={730}
                className="insert-video-modal"
                title={title} 
                visible={visible} 
                onCancel={this.onCancel}
                footer={[
                    <a key="submit" className={style["p-btn-l"]} onClick={this.modalHandleOk}>确 定</a>,
                    <a key="back" className={style["p-btn-r"]} onClick={this.onCancel}>取 消</a>,                
                ]}
                >
                    <input placeholder="请输入视频地址" onChange={this.videoUrlChange} ref="videoUrl" style={{width: '554px',height: '40px',display: 'block',margin:'0 auto',border:'1px solid #ccc',borderRadius:'2px',padding:'0 10px',outline:'none'}}/>
                    <div className={style.videoarea} ref="videoArea"></div>
                </Modal>
            </div>
        )
    }
}

InsertVideo.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    url: PropTypes.string,
}

export default InsertVideo; 