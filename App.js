function App(props) {
  return (
    <>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-player" className="label__lg">
            Add a player:
          </label>
        </h2>
        <input
          type="text"
          id="new-player"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    </>
  );
}