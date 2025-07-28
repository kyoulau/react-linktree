import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";

import  Input  from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import {db} from "../../services/firebaseConnection";
import {
  addDoc, //ad documento dentro de uma coleção, gera o id automatico.
  collection,
  onSnapshot, //sempre vai estar monitorando a aplicação
  query,
  doc,
  orderBy,
  deleteDoc
} from "firebase/firestore";

interface LinkProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

function Admin() {

  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

  const [links, setLinks] = useState<LinkProps[]>([])


  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
      
    })

    return () => {
      unsub();
    }
  }, [])

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id)
    deleteDoc(docRef)
  }

  function handleRegister(e: FormEvent){
    e.preventDefault()

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("")
      setUrlInput("")
      console.log("CADASTRADO COM SUCESSO!")
    })
    .catch((error) => {
      console.log("ERRO AO CADSATRAR NO BANCO" + error)
    })
  }
  
  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form 
      onSubmit={handleRegister}
      className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={ (e) => setNameInput(e.target.value) }
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={ (e) => setUrlInput(e.target.value) }
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={ (e) => setTextColorInput(e.target.value) }
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={ (e) => setBackgroundColorInput(e.target.value) }
            />
          </div>
        </section>

        {nameInput !== "" && urlInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
          <article
            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
          >
            <p className="font-medium" style={{ color: textColorInput }}>Canal do Youtube</p>
          </article>
        </div>
        )}


        <button className="bg-amber-900 h-9 rounded-md text-amber-50 font-medium gap-4 flex justify-center items-center">
        
            Salvar Link

          </button>

      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus links
      </h2>

      {links.map( (link) => (
      <article 
        key={link.id}
        className="flex items-center justify-between w-11/12 max-w-x1 rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: link.bg, color: link.color}}
      >
        <p>{link.name}</p>
        <div>
          <button
            className="border border-dashed p-1 rounded"
            onClick={ () => handleDeleteLink(link.id) }
          >
            <FiTrash size={18} color="#db2629"/>
          </button>
        </div>
      </article>
      ))}
    </div>
  );
}

export default Admin;
