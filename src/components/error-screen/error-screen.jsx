import React from "react";

import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";
import {Pages} from "../../helpers/const";

const ErrorScreen = () => (
  <div className="user-page">
    <PageHeader currentPage={Pages.ERROR} />

    <div className="sign-in user-page__content">
      <h1 className="page-title">Sorry, something went wrong! :(</h1>
      <p>We are working to solve this problem. Please, try again later.</p>
    </div>

    <PageFooter />
  </div>
);

export default ErrorScreen;
