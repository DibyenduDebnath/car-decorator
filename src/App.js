import { useState } from "react";
import "./App.css";
import red_exterior from "./images/model_1_flameRed.jfif";
import white_exterior from "./images/model_1_calgaryWhite.jfif";
import green_exterior from "./images/model_1_foliageGreen.jfif";
import white_interior from "./images/model_1_perlino.jfif";
import brown_interior from "./images/model_1_caraway.jfif";
import black_interior from "./images/model_1_ebony.jfif";

let nextId = 0;

function App() {
  const exteriorImages = {
    red: red_exterior,
    white: white_exterior,
    green: green_exterior,
  };
  const interiorImages = {
    white: white_interior,
    brown: brown_interior,
    black: black_interior,
  };

  const [selectedTab, setSelectedTab] = useState('customize'); //tab customize or order
  const [selectedExterior, setSelctedExterior] = useState("red");
  const [selectedInterior, setSelctedInterior] = useState("white");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [orders, setOrders] = useState([]);


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  }

  const handleExteriorChange = (color) =>{
    setSelctedExterior(color);
  }

  const handleInteriorChange = (color) =>{
    setSelctedInterior(color);
  }

  const handleNameChange = (e) =>{
    setInputName(e.target.value);
  }
  const handleEmailChange = (e) =>{
    setInputEmail(e.target.value);
  }
  const handleMobileChange = (e) =>{
    setInputMobile(e.target.value);
  }

  const handleOnSubmit = (event) =>{
    event.preventDefault();
    let neworder = {
      orderId: nextId++,
      interiorColor: selectedInterior,
      exteriorColor: selectedExterior,
      customerName: inputName,
      customerEmail: inputEmail,
      customerMobile: inputMobile
    };
    setOrders([...orders, neworder]);

    setSelctedExterior("red");
    setSelctedInterior("white");
    setInputName("");
    setInputEmail("");
    setInputMobile("");
  }

  const handleDelete = (orderId) => {
    setOrders(orders.filter((order) => {
      return order.orderId !== orderId;
    }));
  }
  //===============================Debug Start=============//
    
  //===============================Debug End=============//

  return (
    <div className="App">
      <header>
        <h3>Car Color Customizer</h3>
        <nav>
          <button data-testid="customizeTab" className={ selectedTab === "customize" ? "active" : "" } onClick={() => {handleTabChange("customize")}}>Customize</button>
          <button data-testid="ordersTab" className={ selectedTab === "order" ? "active" : "" } onClick={() => {handleTabChange("order")}}>Orders</button>
        </nav>
      </header>
      { selectedTab === "customize" ? 
        <div className="container">
          <section className="left">
            <div className="centered">
              <h3>Select Exterior</h3>
              {/********** Preview image and radio buttons for selecting Exterior color ***********/}
              <img src={exteriorImages[selectedExterior]} alt="Exterior Preview" />
              <div>
                { Object.keys(exteriorImages).map((color) => {
                  return <label key={color}>
                  <input
                    type="radio"
                    name="exterior"
                    value={color}
                    checked={selectedExterior === color}
                    onChange={() => handleExteriorChange(color)}
                    data-testid={color}
                  />
                  {color}
                </label>
                })}
              </div>
            </div>
          </section>
          
          <section className="form">
            {/*********** Template form to get details of customer ***********/}
            <form>
              <h3>Place Order</h3>
              <p data-testid="selctedExterior">{"Exterior: " + selectedExterior }</p>
              <p data-testid="selctedInterior">{"Interior: " + selectedInterior }</p>
              <input type="text" data-testid="customerName" value={inputName} placeholder="Name" onChange={handleNameChange} />
              <input type="email" data-testid="email" value={inputEmail} placeholder="Email" onChange={handleEmailChange} />
              <input
                type="number"
                data-testid="mobileNumber"
                value={inputMobile}
                placeholder="Mobile"
                onChange={handleMobileChange}
              />
              <input type="submit" value="Order Now" data-testid="submitButton" onClick={handleOnSubmit} />
            </form>
          </section>

          <section className="right">
            <div className="centered">
              <h3>Select Interior</h3>
              {/*********** Preview image and radio buttons for selecting Interior color ***********/}
              <img src={interiorImages[selectedInterior]} alt="Interior Preview" />
              <div>
                { Object.keys(interiorImages).map((color) => {
                  return <label key={color}>
                  <input
                    type="radio"
                    name="interior"
                    value={color}
                    checked={selectedInterior === color}
                    onChange={() => handleInteriorChange(color)}
                    data-testid={color}
                  />
                  {color}
                </label>
                })}
              </div>
            </div>
          </section>
        </div> :
        <section className="orders">
          <table>
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Exterior Color</th>
                <th scope="col">Interior Color</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {/*********** Template for each row ***********/}
              { orders.map((order) => {
                return <tr key={order.orderId}>
                  <td>{order.customerName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.customerMobile}</td>
                  <td>{order.exteriorColor}</td>
                  <td>{order.interiorColor}</td>
                  <td><button type="button" onClick={() => {handleDelete(order.orderId)}}>Delete</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </section>
      }
      
      
    </div>
  );
}

export default App;