
function TitleGroup({ group }) {
  return (
    <div id="title" className="d-flex flex-column justify-content-center p-3">
      <h1>G</h1>
      <h1>R</h1>
      <h1>O</h1>
      <h1>U</h1>
      <h1>P</h1>
      <h1 className="mt-4">{group}</h1>
    </div>
  );
}

export { TitleGroup };