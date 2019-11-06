import React, { Component } from "react";

export default class Modal extends Component<{ show: boolean, onClose: () => void }> {

    onClose = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div>{this.props.children}</div>
                <div>
                    <button
                        onClick={e => {
                            this.onClose();
                        }}
                    >Close</button>

                </div>
            </div>
        );
    }
}

