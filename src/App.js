import React from 'react';
import './App.css';

const INTERVAL = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {      
    return (<div>
      <Timer/>
      <Conditioner/>
      <Response isSuccess={true} />
      <FirePlace/>
      <HideShow/>
      <UserList users={users}/>
      <Chat users={users} messages={messages}/>
      <br></br>
      <LoginForm />
      <br></br>
      <MessageForm/>
      <br></br>
      <LanguageForm/>
      <br></br>
      <PersonForm/>
      <br></br>
    </div>
    );
  }
}

export default App;

//////////////////////////////////////////////////////

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }
  
  increment(){
    this.setState({value: this.state.value + 1});
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => this.increment(), 1000/INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {      
    const value = this.state.value
    return (<div>
      <p>Таймер:</p>
      <p>
        <span>{`${Math.round(value/INTERVAL)}`} . </span>
        <span>{`${value % INTERVAL}`} s </span>
      </p>
    </div>
    );
  
  }
}

//////////////////////////////////////////////////////

class Conditioner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: 0};

    // Привязка необходима, чтобы сделать this доступным в коллбэке
    this.onIncrease = this.onIncrease.bind(this);
    //this.onDecrease = this.onDecrease.bind(this);
  }

  onIncrease(){
    this.setState(prevState => ({
      temperature: prevState.temperature + 1
    }))
  }

  onDecrease(){
    this.setState(prevState => ({
      temperature: prevState.temperature - 1
    }))
  }

  render() {
    return (
      <p>
        <h2>Текущая температура: {this.state.temperature}</h2>
        <button onClick={() => this.onDecrease()}>-</button>
        <button onClick={this.onIncrease}>+</button>
      </p>
    );
  }
}

/////////////////////////////////////////////////////

function ErrorMessage(props) {
  return <h3>Прошло сообщение false.</h3>;
}

function SuccessMessage(props) {
  return <h3>Прошло сообщение true</h3>;
}

function Response(props) {
  const isSuccess = props.isSuccess;
  if (isSuccess) {
    return <SuccessMessage/>;
  }
  return <ErrorMessage/>;
  //или
  //return isSuccess ? <SuccessMessage/> : <ErrorMessage/>
}

//////////////////////////////////////////////////////////

function SetFireButton(props) {
  return (<button className="orange" onClick={props.onClick}>Зажечь</button>);
}

function SnuffOutButton(props) {
  return (<button className="blue" onClick={props.onClick}>Потушить</button>);
}

class FirePlace extends React.Component {
  constructor(props) {
    super(props);
    this.onSetFire = this.onSetFire.bind(this);
    this.onSnuffOut = this.onSnuffOut.bind(this);
    this.state = {isBurning: false};
  }

  onSetFire() {
    this.setState({isBurning: true});
  }

  onSnuffOut() {
    this.setState({isBurning: false});
  }

  render() {
    const isBurning = this.state.isBurning;

    let button = null;

    // if(isBurning){
    //   button = <SnuffOutButton onClick={this.onSnuffOut} />
    // } else {
    //   button = <SetFireButton onClick={this.onSetFire} />;
    // }

    isBurning ?  button = <SnuffOutButton onClick={this.onSnuffOut} /> : button = <SetFireButton onClick={this.onSetFire} />
     
    return (
      <div>
        {/* <Indicator isBurning={isBurning} /> */}
        {button}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////

function SomeAlert(props) {
  return (
    <h3 className="alert alert-danger">{props.text}</h3>
  );
}

class HideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSomeAlertShowed: true}
    this.toggleSomeAlert = this.toggleSomeAlert.bind(this);
  }

  toggleSomeAlert() {
    this.setState(prevState => ({
      isSomeAlertShowed: !prevState.isSomeAlertShowed
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSomeAlert}>
          {this.state.isSomeAlertShowed ? 'Скрыть' : 'Показать'}
        </button>
        {this.state.isSomeAlertShowed ?
            <SomeAlert text={'Приветствуем Вас на нашем сайте!'} /> : null}
      </div>
    );
  }
}

/////////////////////////////////////////////////

const users = ['User1', 'User2', 'User3', 'User4'];
function UserList(props){
  const users = props.users;
  const items = users.map((user) => <li>{user}</li>);
  return (<ul>{items}</ul>)
}

////////////////////////////////////////////////////

function Chat(props) {
  const users = props.users;

  const userList = (
    <p> Пользователи чата:
      {users2.map((user) =>
        <b key={user.id}> {user.name}; </b>
      )}
    </p>
  );

  const messageList = props.messages.map((message) => {
    let author = null;

    // Находим автора сообщения в списке users
    //users2.forEach((user) => {if(user.id === message.authorId) author = user});
    users2.map((user) => {if(user.id === message.authorId) author = user});
   
    return (
      <p key={message.id}>
        <b>{author.name}: </b>
        <span>{message.message}</span>
      </p>
    )
  });

  return (
    <p>
      {userList}
      {messageList}
    </p>
  );
}

const users2 = [
  {id: 1, name: 'Вася'},
  {id: 2, name: 'Игорь'},
  {id: 3, name: 'Коля'}
];

const messages = [
  {id: 1, message: 'Всем привет!', authorId: 1},
  {id: 2, message: 'И тебе привет!', authorId: 2},
  {id: 3, message: 'Привет, Вася :)', authorId: 3}
];

//////////////////////////////////////////////////////////////

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login: '', password: ''};

    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    alert(`${this.state.login}, добро пожаловать!`);
    event.preventDefault();
  }

  onChangePassword(event){
    this.setState({password: event.target.value});
  }

  onChangeLogin(event) {
    this.setState({login: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p><label> Логин: <input type="text" name="login" value={this.state.login}
                         onChange={this.onChangeLogin}/></label></p>
        <p><label> Пароль: <input type="password" name="password" value={this.state.password}
                          onChange={this.onChangePassword}/></label></p>
        <p><input type="submit" value="Submit" /></p>
      </form>
    );
  }
}

////////////////////////////////////////////////////////////////////////

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', message: 'Текст сообщения'};

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    alert(`Сообщение успешно отправлено получателю "${this.state.email}"`);
    event.preventDefault();
  }

  onChangeMessage(event){
    this.setState({message: event.target.value});
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p><label> email получателя: <input type="text" name="email" value={this.state.email}
                         onChange={this.onChangeEmail}/></label></p>
        <p><label>Текст сообщения: <textarea type="text" name="message" value={this.state.message}
          onChange={this.onChangeMessage}/></label></p>
        <p><input type="submit" value="Submit" /></p>
      </form>
    );
  }
}

///////////////////////////////////////////////////////////////////////////

class LanguageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {language: 'JavaScript'};

    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeSelect(event) {
    this.setState({language: event.target.value});
  }

  onSubmit(event) {
    alert(`Вы выбрали язык: ${this.state.language}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Выберите язык программирования:
          <select value={this.state.language} onChange={this.onChangeSelect}>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Scala">Scala</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

////////////////////////////////////////////////////////////////

class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sex: 'female', firstName: '', lastname: '', email: '', phone: ''};
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(event) {
    const name = event.target.name;
    const value = this.state.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form>
        <label>First Name: <input name="firstName"  type="text"
                             value={this.state.firstName} onChange={this.onChangeInput}/></label>
        <label> Last Name: <input name="lastName"  type="text"
                             value={this.state.lastName} onChange={this.onChangeInput}/></label>
        <label> Email: <input name="email"  type="email"
                             value={this.state.email} onChange={this.onChangeInput}/></label>
        <label> Phone: <input name="phone"  type="tel"
                             value={this.state.phone} onChange={this.onChangeInput}/></label>
        <label> Sex: <select name="sex"  value={this.state.sex} onChange={this.onChangeInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </form>
    );
  }
}
