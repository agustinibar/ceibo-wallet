import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";


const CreateUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const currentUser = auth.currentUser;

        if(currentUser){
            try {
                const userDoc = doc(db, 'users', currentUser.uid);
                await updateDoc(userDoc, {
                    firstName: name,
                    lastName: lastName
                });
                navigate('/wallet')
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <div>
        <h1>Completa tu perfil primero :D</h1>
        <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Apellido</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default CreateUser;