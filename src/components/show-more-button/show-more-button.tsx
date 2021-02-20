import * as React from 'react';

interface ShowMoreButtonProps {
  onShowMoreButtonClick(): void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onShowMoreButtonClick
}: ShowMoreButtonProps) => (
  <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        onShowMoreButtonClick();
      }}
    >
      Show more
    </button>
  </div>
);

export default ShowMoreButton;
