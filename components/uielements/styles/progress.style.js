import styled from 'styled-components';

const AntProgress = ComponentName => styled(ComponentName)`
  &.ant-progress-line {
    .ant-progress-outer {
      padding-right: calc(2em + 16px);
      margin-right: calc(-2em - 16px);
    }

    .ant-progress-text {
      text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
      margin: ${props =>
        props['data-rtl'] === 'rtl' ? '0 0.75em 0 0' : '0 0 0 0.75em'};
    }
  }
`;

export default AntProgress;
