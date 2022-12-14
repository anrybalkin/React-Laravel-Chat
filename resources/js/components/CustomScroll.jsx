import React from "react";

const contentRef = React.createRef();

class CustomScroll extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            onScrollUpCall: props.onScrollUp,
            onScrollDownCall: props.onScrollDown,
            children: props.children,
            className: props.className,
            prevPostion: 0,
            thumbHeight: 20,
            scrollStartPosition: 0,
            initialScrollTop: 0
        }
        this.onHandleThumbMousemove = this
            .onHandleThumbMousemove
            .bind(this);
        this.onHandleThumbMousedown = this
            .onHandleThumbMousedown
            .bind(this);
        this.onHandleStart = this
            .onHandleStart
            .bind(this);
        this.onHandleMove = this
            .onHandleMove
            .bind(this);
        this.onHandleEnd = this
            .onHandleEnd
            .bind(this);

        this.onScrollUp = this.onScrollUp.bind(this)

        
        
    }

    onHandleMove(evt) {
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            document.body.scrollTo = Math.floor(touches[i].pageY) 
        }
    }

    onHandleStart(evt) {
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            document.body.scrollTo = Math.floor(touches[i].pageY) 
        }
    }

    onHandleEnd(evt) {
        var touches = evt.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            document.body.scrollTo = Math.floor(touches[i].pageY) 
        }
    }
    componentDidMount()
    {
        document.addEventListener('mousemove', this.onHandleThumbMousemove);
        document.addEventListener("touchstart", this.onHandleStart,false);
        document.addEventListener("touchend", this.onHandleEnd,false);
        document.addEventListener("touchmove", this.onHandleMove,false);
        if(typeof(this.state.onScrollUpCall) == "function")
        {
            contentRef.current.addEventListener("scroll", this.onScrollUp);
        }
    }

    onScrollUp(e)
    {
        if(contentRef.current.scrollTop==0)
        {
            this.state.onScrollUpCall();
        }

    }

    onHandleThumbMousedown(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({scrollStartPosition: e.clientY});
        if (contentRef.current) 
            this.setState({initialScrollTop: contentRef.current.scrollTop});
        }
    
    onHandleThumbMousemove(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isDragging) {
            const {scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight} = contentRef.current;
            const deltaY = (e.clientY - this.state.scrollStartPosition) * (contentOffsetHeight / this.state.thumbHeight);
            const newScrollTop = Math.min(this.state.initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);

            contentRef.current.scrollTop = newScrollTop;
        }
    }

    render()
    {
        return <div className="custom-scrollbars__container">
            <div
                className={"custom-scrollbars__content " + this.state.className}
                ref={contentRef}
                onMouseDown={this.onHandleThumbMousedown}>
                {this.state.children}
            </div>
        </div>
    }

}

export default CustomScroll;