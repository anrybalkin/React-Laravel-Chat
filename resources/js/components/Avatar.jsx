import React from "react";
import PropTypes from 'prop-types';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        let options=props.options;
        this.state = {
            avatar: props.props.avatar,
            status: props.props.status,
            username: props.props.username,
            minify: options!=undefined&&options!=""?options.minify:false,
        };
    }

    render() {
        if (this.state.status === "offline") {
            if(this.state.minify==true)
            {
                return <div className="avatar-block mini">
                <img
                    className="avatar-img mini"
                    src={this.state.avatar==undefined||this.state.avatar==""?"images/unknown-person-icon-10.jpeg":this.state.avatar}
                    alt={"avatar " + this.state.username}/>
            </div>
            }
            return <div className="avatar-block">
                <img
                    className="avatar-img"
                    src={this.state.avatar==undefined||this.state.avatar==""?"images/unknown-person-icon-10.jpeg":this.state.avatar}
                    alt={"avatar " + this.state.username}/>
            </div>
        } else {
            if(this.state.minify==true)
            {
                return <div className="avatar-block mini">
                <img
                    className="avatar-img mini"
                    src={this.state.avatar==undefined||this.state.avatar==""?"images/unknown-person-icon-10.jpeg":this.state.avatar}
                    alt={"avatar " + this.state.username}/>
            </div>
            }
            else
            {
                return <div className="avatar-block verify">
                <img
                    className="avatar-img"
                    src={this.state.avatar==undefined||this.state.avatar==""?"images/unknown-person-icon-10.jpeg":this.state.avatar}
                    alt={"avatar " + this.state.username}/>
                <div className="avatar-icon">V</div>
            </div>
            }
            
        }

    }

}

Avatar.propTypes = {
    avatar: PropTypes.string,
    status: PropTypes.bool,
    username: PropTypes.string
};

export default Avatar;