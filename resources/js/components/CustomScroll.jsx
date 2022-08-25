import React from "react";

  const contentRef = React.createRef();

class CustomScroll extends React.Component
{
    constructor(props)
    {

        super(props);
        this.state = {
            onScrollUp: props.onScrolUp,
            onScrollDown: props.onScrolDown,
            children: props.children,
            className: props.className,
            prevPostion: 0,
            thumbHeight: 20,
            scrollStartPosition: 0,
            initialScrollTop: 0,
        }
        this.onHandleThumbMousemove=this.onHandleThumbMousemove.bind(this);
        this.onHandleThumbMousedown=this.onHandleThumbMousedown.bind(this);
        

        if (this.state.onScrollDown != undefined && typeof(this.state.onScrollDown) == "function") {
            this.state.onScrollDown = this
                .state
                .onScrollDown
                .bind(this)
        }
        if (this.state.onScrollUp != undefined && typeof(this.state.onScrollUp) == "function") {
            this.state.onScrollUp = this
                .state
                .onScrollUp
                .bind(this)
        }
    }

    componentDidMount()
    {
        document.addEventListener('mousemove', this.onHandleThumbMousemove);
    }

    onHandleThumbMousedown(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({scrollStartPosition:e.clientY});
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
            <div className={"custom-scrollbars__content "+this.state.className} ref={contentRef} onMouseDown={this.onHandleThumbMousedown}>
                {this.state.children}
            </div>
        </div>
    }

}

export default CustomScroll;