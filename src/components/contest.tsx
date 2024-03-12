import { useEffect, useState } from "react";

import {
  addNewNameToContest,
  fetchContest,
} from "../api-client";

import Header from "./header";

const Contest = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);

  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names]);

  const handleClickContestList = (event) => {
    event.preventDefault();
    onContestListClick();
  };

  const handleNewNameSubmit = async (event) => {
    event.preventDefault();
    const newNameInput = event.target.newName;
    const updatedContest = await addNewNameToContest({
      contestId: contest.id,
      newNameValue: newNameInput.value,
    });
    setContest(updatedContest);
  };

  return (
    <>
      <Header message={contest.contestName} />
      <div className="contest">
        <div className="title">Descrição do concurso</div>
        <div className="description">{contest.description}</div>

        <div className="title">Nomes propostos</div>
        <div className="body">
          {contest.names?.length > 0 ? (
            <div className="list">
              {contest.names.map((proposedName) => (
                <div key={proposedName.id} className="item">
                  {proposedName.name}
                </div>
              ))}
            </div>
          ) : (
            <div>Sem nomes</div>
          )}
        </div>

        <div className="title">Proponha um novo nome</div>
        <div className="body">
          <form onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              name="newName"
              placeholder="Digite um novo nome aqui..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <a
          href="/"
          className="link"
          onClick={handleClickContestList}
        >
          Lista de concursos
        </a>
      </div>
    </>
  );
};

export default Contest;
