import React from 'react';
import {TextStyle} from 'react-native';
import ReactTimeAgo from 'react-time-ago';
import {Style} from 'javascript-time-ago';
import {RgText} from 'components/_ui/typography';

interface TimeProps {
  date: Date;
  tooltip: boolean;
  children: string;
  verboseDate?: string;
}
interface TimeAgoProps {
  date: Date | number;
  textStyle?: TextStyle;
  timeStyle?: string | Style;
}

const TimeAgo = ({
  date,
  timeStyle = 'round-minute',
  textStyle,
}: TimeAgoProps) => {
  function Time({children}: TimeProps) {
    return <RgText style={textStyle}>{children}</RgText>;
  }

  return <ReactTimeAgo component={Time} timeStyle={timeStyle} date={date} />;
};

export default TimeAgo;
