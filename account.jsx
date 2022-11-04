// this keeps a running total of deposits and withdrawals

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid,transValue }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      {atmMode && <div>
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange} value={transValue}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      </div>
      }
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction,setValidTransaction] = React.useState(false);
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = event => {
    console.log('handleChange fired');
    if(Number(event.target.value)<=0) setValidTransaction(false);
    else if(atmMode==='Cash Back' && Number(event.target.value)>totalState) setValidTransaction(false);
    else setValidTransaction(true);
    setDeposit(Number(event.target.value));
   
  };
  const handleSubmit = (event) => {
    console.log('fired handle submit');
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setDeposit(0);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    console.log('select change fired');
    setDeposit(0);
    setAtmMode(event.target.value);
    if(event.target.value==='Deposit') setIsDeposit(true);
    if(event.target.value==='Cash Back') setIsDeposit(false);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label className="label huge">Select an action below to continue
      <div><select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      </div></label>
      <br></br>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={validTransaction} transValue={deposit}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
