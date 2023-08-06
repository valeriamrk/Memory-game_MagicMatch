import React from "react";
import { Lose, Win } from "../..";
import "./MyModal.scss";
import { createPortal } from "react-dom";

const portal = document.getElementById("portal");

const MyModal = (props) => {
  const {
    isModalActive,
    startGame,
    setStartGame,
    shuffleCards,
    restartGame,
    turns,
    backToWelcomePage,
    gameMode,
    isGameLosed,
  } = props;
  return createPortal(
    <div
      className={isModalActive ? "modal active" : "modal"}
      isModalActive={isModalActive}
    >
      <div className="modalContent">
        {isGameLosed ? (
          <Lose
            startGame={startGame}
            shuffleCards={shuffleCards}
            setStartGame={setStartGame}
            restartGame={restartGame}
            turns={turns}
            backToWelcomePage={backToWelcomePage}
            gameMode={gameMode}
          />
        ) : (
          <Win
            startGame={startGame}
            shuffleCards={shuffleCards}
            setStartGame={setStartGame}
            restartGame={restartGame}
            turns={turns}
            backToWelcomePage={backToWelcomePage}
            gameMode={gameMode}
          />
        )}
      </div>
    </div>,
    portal
  );
};

export { MyModal };
