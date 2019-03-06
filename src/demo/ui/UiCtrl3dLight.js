/**
 * @fileOverview UiCtrl3dLight
 * @author Epam
 * @version 1.0.0
 */


// ********************************************************
// Imports
// ********************************************************

// special css for NoUiSlioder
import 'nouislider/distribute/nouislider.css';

import React from 'react';
import { connect } from 'react-redux';

import Nouislider from 'react-nouislider';

import Modes3d from '../store/Modes3d';
import StoreActionType from '../store/ActionTypes';

import UiHistogram from './UiHistogram';
import UiTF from './UiTF';


// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************

/**
 * Class UiCtrl3dLight some text later...
 */
class UiCtrl3dLight extends React.Component {
  /**
   * @param {object} props - props from up level object
   */
  constructor(props) {
    super(props);
    this.onModeA = this.onModeA.bind(this);
    this.onModeB = this.onModeB.bind(this);
    this.onModeC = this.onModeC.bind(this);
    this.onMode = this.onMode.bind(this);
    this.m_updateEnable = true;
  }
  onMode(indexMode) {
    this.m_updateEnable = true;
    console.log(`3d control slight . mode = ${indexMode}`);
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_MODE_3D, mode3d: indexMode });
  }
  onModeA() {
    this.onMode(Modes3d.ISO);
  }
  onModeB() {
    this.onMode(Modes3d.RAYCAST);
  }
  onModeC() {
    this.onMode(Modes3d.RAYFAST);
  }
  onChangeSliderBrightness() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderBrightness.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Brightness, sliderBrightness: Number.parseFloat(aval) });
  }
  onChangeSliderCut() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderCut.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Cut, sliderCut: Number.parseFloat(aval) });
  }
  onChangeSliderQuality() {
    this.m_updateEnable = false;
    const aval = this.refs.sliderQuality.slider.get();
    const store = this.props;
    store.dispatch({ type: StoreActionType.SET_SLIDER_Quality, sliderQuality: Number.parseFloat(aval) });    
  }
  shouldComponentUpdate() {
    return this.m_updateEnable;
  }
  /**
   * Main component render func callback
   */
  render() {
    const store = this.props;

    const sliderBrightness = store.sliderBrightness;
    const sliderCut = store.sliderCut;
    const sliderQuality = store.sliderQuality;

    const wArrBrightness = [sliderBrightness];
    const wArrCut = [sliderCut];
    const wArrQuality = [sliderQuality];
    const mode3d = store.mode3d;
    const vol = store.volume;

    const strClass = 'btn btn-info';
    const strA = strClass + ((mode3d === Modes3d.ISO) ? ' active' : '');
    const strB = strClass + ((mode3d === Modes3d.RAYCAST) ? ' active' : '');
    const strC = strClass + ((mode3d === Modes3d.RAYFAST) ? ' active' : '');

    // console.log(`UiCtr3dLight. render. flags = ${bCheckedSag}+${bCheckedCor}+${bCheckedTra}`);

    // btn-default active

    const jsxRenderControls =

      <ul className="list-group list-group-flush" >
        <li className="list-group-item">
          <div className="btn-group btn-block">
            <button type="button" className={strA} onClick={this.onModeA} >
              Mode Isosurface
            </button>
            <button type="button" className={strB} onClick={this.onModeB}  >
              Mode Raycast
            </button>
            <button type="button" className={strC} onClick={this.onModeC} >
              Mode Rayfix
            </button>
          </div>
        </li>
        <li className="list-group-item">
          <UiHistogram volume={vol} />
        </li>
        <li className="list-group-item">
          <UiTF />
        </li>
        <li className="list-group-item">
          <p> Brightness </p>
          <Nouislider onSlide={this.onChangeSliderBrightness.bind(this)} ref={'sliderBrightness'}
            range={{ min: 0.0, max: 1.0 }}
            start={wArrBrightness} step={0.02} tooltips={true} />
        </li>
        <li className="list-group-item">
          <p> Cut </p>
          <Nouislider onSlide={this.onChangeSliderCut.bind(this)} ref={'sliderCut'}
            range={{ min: 0.0, max: 1.0 }}
            start={wArrCut} step={0.02} tooltips={true} />
        </li>
        <li className="list-group-item">
          <p> Quality </p>
          <Nouislider onSlide={this.onChangeSliderQuality.bind(this)} ref={'sliderQuality'}
            range={{ min: 0.0, max: 1.0 }}
            start={wArrQuality} step={0.02} tooltips={true} />
        </li>
      </ul>

    return jsxRenderControls;
  }
}

export default connect(store => store)(UiCtrl3dLight);