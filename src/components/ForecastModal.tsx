import React, { Component } from "react";

export default class ForecastModal extends Component<{ show: boolean }> {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">{this.props.children}</section>
        </div>
      </div>
    );
  }
}
