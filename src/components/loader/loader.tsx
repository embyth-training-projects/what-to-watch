import * as React from "react";
import ReactLoading from 'react-loading';

const loaderStyles = {
  display: `flex`,
  width: `100%`,
  minHeight: `100vh`,
  justifyContent: `center`,
  alignItems: `center`,
};

const Loader: React.FC = () => (
  <React.Fragment>
    <div className="user-page">
      <div className="sign-in user-page__content" style={loaderStyles}>
        <ReactLoading
          type={`spinningBubbles`}
          color={`#d9cd8d`}
        />
      </div>
    </div>
  </React.Fragment>
);

export default Loader;
