import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator as AppActionCreator} from "../../store/app/app";

import MoviePromo from "../movie-promo/movie-promo";
import Catalog from "../catalog/catalog";
import PageFooter from "../page-footer/page-footer";

import {ALL_GENRES} from "../../helpers/const";

interface MainPageProps {
  restoreCurrentGenre(): void;
}

class MainPage extends React.PureComponent<MainPageProps> {
  componentDidMount() {
    const {restoreCurrentGenre} = this.props;
    restoreCurrentGenre();
  }

  componentDidUpdate() {
    const {restoreCurrentGenre} = this.props;
    restoreCurrentGenre();
  }

  render() {
    return (
      <React.Fragment>

        <MoviePromo />

        <div className="page-content">
          <Catalog />
          <PageFooter />
        </div>

      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restoreCurrentGenre() {
    dispatch(AppActionCreator.setCurrentGenre(ALL_GENRES));
  },
});

export default connect(null, mapDispatchToProps)(MainPage);
