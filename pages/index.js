import { useState } from "react";
import styles from '../styles/Home.module.css'
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import Form from 'react-bootstrap/Form';

import db from './db/firestore'
import { useRouter } from "next/router";

export default function Home() {

  const r = useRouter();

  const [textmail, onChangeMail] = useState("");
  const [textpassword, onChangePassword] = useState("");
  const [textnewmail, onChangeNewMail] = useState("");
  const [textnewpassword1, onChangeNewPassword1] = useState("");
  const [textnewpassword2, onChangeNewPassword2] = useState("");
  const [show,setShow] = useState(true);
  
  async function checkUser() {
    const docRef = doc(db, "user", textmail);
    const utente = await getDoc(docRef);
    if (utente.exists()) {
      if(utente.data().password==textpassword){
        r.push({ pathname: './user', query: {id: textmail, data: JSON.stringify(utente.data())} });
      } /*else{
          Toast.show({
             type: 'error',
             text1: 'Attenzione!!',
             text2: "Password non corrispondente all'utente",
             visibilityTime: 8000,
           });
      }
    } else {
      Toast.show({
           type: 'error',
           text1: 'Attenzione!!',
           text2: "Utente non trovato",
           visibilityTime: 8000,
         });*/
    }
  }

  const [isAccedi, setIsAccedi] = useState(true);

  const accedi = <>
    <div>
      <p>Inserisci i tuoi dati ed accedi</p>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3 text-light`} id="inputMail1" placeholder='Email'
        value={textmail} onChange={(e) => onChangeMail(e.target.value)}/>
    </div>
    <div>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword1" placeholder="Password"
        value={textpassword} onChange={(e) => onChangePassword(e.target.value)}/>
    </div>
    <button className="btn mt-4 dblue t-abo" onClick={()=>checkUser()}>Accedi</button>
  </>

  const registrati =  <>
    <div>
      <p>Inserisci i tuoi dati e registrati</p>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3 text-light`} id="inputMail2" placeholder='Email'
        value={textnewmail} onChange={(e) => checkRegistrati(e.target.value)}/>
    </div>
    <div>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword2" placeholder="Password"
        value={textnewpassword1} onChange={(e) => onChangeNewPassword1(e.target.value)}/>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword3" placeholder="Conferma Password"
        value={textnewpassword2} onChange={(e) => onChangeNewPassword2(e.target.value)}/>
    </div>
    <button className="btn mt-4 dblue t-abo" onClick={()=>registrati()}>Registrati</button>
  </>

  return (
    <main className={`${styles.main} lock-height`}>
      <img src="./logo.png" className={styles.logo} alt="R"/>
      <h1 className="mt-2 d-flex align-items-end p-0 mx-4 my-3 pt-3"> Museo della Regina </h1>
      <p className="t-elite mx-auto w-75"> Scopri la verit?? nascosta tra i reperti </p>
      <div className={`${styles.form} container gray shadow mt-3`}>
        <div className="d-flex justify-content-around">
          <a onClick={()=>setIsAccedi(true)}
            className={isAccedi ? "btn border-bottom-0 m-0 text-decoration-underline t-abo" : "btn border-bottom-0 m-0 opacity-50 t-abo"}>Accedi</a>
          <a onClick={()=>setIsAccedi(false)}
            className={isAccedi ? "btn border-bottom-0 m-0 opacity-50 t-abo" : "btn border-bottom-0 m-0 text-decoration-underline t-abo"}>Registrati</a>
        </div>
        <hr className="mt-0"/>
        {isAccedi || accedi==null ? accedi : registrati}
      </div>

    </main>
  )
}

