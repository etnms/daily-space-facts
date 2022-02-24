const ToggleSwitch = (props) => {
  const {setImperial } = props;

  const valueToggle = () => {
    const checkbox = document.querySelector("#toggle-system");
    setImperial(checkbox.checked);
  };

  return (
    <div className="wrapper-toggle">
      <h1>Units</h1>

      <div className="toggle-switch">
        <span>Metric</span>
        <label className="switch">
          <input
            type="checkbox"
            id="toggle-system"
            onClick={() => {
              valueToggle();
            }}
          />
          <span className="slider round"></span>
        </label>
        <span>Imperial</span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
