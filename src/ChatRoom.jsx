import { useEffect, useRef, useState } from "react";
import { auth, db } from "./firebase";
import { query, collection, orderBy, limit, serverTimestamp, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function ChatRoom() {
  const dummy = useRef();
  const [formValue, setFormValue] = useState("");

  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main>
        {messages && messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="메세지를 입력하세요~" />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"} />
        <p>{text}</p>
      </div>
    </>
  );
}
