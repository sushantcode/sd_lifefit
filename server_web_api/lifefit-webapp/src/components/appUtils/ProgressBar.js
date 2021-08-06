import React, { PureComponent } from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// this is the inner circle with whatever you want inside
const CustomProgressBar = props => {
  const { children, ...otherProps } = props
  return (
    <div>
      <div>
        <CircularProgressbar {...otherProps} />
      </div>
    </div>
  )
}

// this is the component imported to the view
class ProgressBar extends PureComponent {
  render() {
    const {
      value,
      background,
      text,
      minValue,
      maxValue,
      endColor,
      startColor,
      gradientId,
    } = this.props;
    const gradientTransform = `rotate(0)`
    return (
      <div>
        <svg style={{ height: 0, width: 0 }}>
          <defs>
            <linearGradient
              id={gradientId}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor="#00ff00" />
              <stop offset="100%" stopColor="#ff0000" />
            </linearGradient>
          </defs>
        </svg>
        <CustomProgressBar
          value={value}
          background={background}
          text={text}
          minValue={minValue}
          maxValue={maxValue}
          styles={{ 
            path: { 
              stroke: `url(#${gradientId})`, 
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s'},
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: '#b1b3af',
            },
            // Customize the text
            text: {
              // Text color
              fill: '#2e2b2b',
              // Text size
              fontSize: '16px',
              fontWeight: 'bold'
            },
            background: {
              fill: "rgba(237, 232, 232, 0.3)",
            }}} />
      </div>
    )
  }
}

export default ProgressBar;