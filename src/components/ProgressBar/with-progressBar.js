import React, { Component } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

const withProgressBar = PlatformSpecificComponent => {
  return class extends Component {
    constructor() {
      super()
      this.state = {
        isLoading: false,
      }
    }

    handleProgressBar = bool => {
      this.setState({ isLoading: bool })
    }
    
    render() {
      const { isLoading } = this.state;
      return (
        <div className="prog-bar">
          { isLoading && <TopBarProgress /> }
          <PlatformSpecificComponent showProgressBar={this.handleProgressBar}/>
        </div>
      )
    }
  
  }
}

export default withProgressBar;