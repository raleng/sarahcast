import React, { Component } from "react";

export default class ForecastModal extends Component<{ show: boolean }> {
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div>{this.props.children}</div>
                <div>Foobar</div>
            </div>
        );
    }
}