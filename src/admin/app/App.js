import './bootstrap.css';
// import './App.css'

import React, { Component } from 'react'
import Nav from './components/nav'
const SidePanel = require('./views/SidePanel')
const dhtExperiment = require('../../experiments/dht/admin')
const errorsExperiment = require('../../experiments/errors/admin')
const trafficExperiment = require('../../experiments/traffic/admin') 

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentView: 'traffic',
      selectedNode: null,
    }
    this.views = {}

    this.loadExperiment(trafficExperiment)
    this.loadExperiment(dhtExperiment)
    this.loadExperiment(errorsExperiment)
  }

  loadExperiment (experiment) {
    // load experiment views
    experiment.views.forEach(view => {
      this.views[view.id] = view
    })
  }

  selectView (target) {
    this.setState(state => ({ currentView: target }))
  }

  render () {
    const actions = {
      selectNode: (clientId) => this.setState({ selectedNode: clientId }),
    }
    const views = Object.values(this.views)
    const currentView = this.views[this.state.currentView]
    const appState = Object.assign({}, this.state)

    return (
      <div className="App">
        <div className="AppColumn LeftPanel">
          <Nav
            routes={views}
            activeRoute={this.state.currentView}
            onNavigate={(target) => this.selectView(target)}
            />
            {currentView && currentView.render({ store: this.props.store, actions })}
        </div>
        <div className="AppColumn RightPanel">
          <SidePanel appState={appState} actions={actions} store={this.props.store}/>
        </div>
      </div>
    )
  }
}

export default App
