
import { useEffect, useState } from 'react'

import {FaMediumM, FaGithub, FaLinkedin, FaInstagram} from 'react-icons/fa'
import Social from "../../components/social"

import { db } from '../../services/firebaseConnection'
import { getDocs, collection, doc, getDoc, orderBy, query } from 'firebase/firestore'

interface LinkProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  instagram: string;
  youtube: string;
}
function Home() {

  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(()=> {
    function loadLinks(){
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then((snapshot) => {
        let lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          })
        })

        setLinks(lista);

      })


    }

    loadLinks();
  }, [])

  useEffect(() => {
    function loadSocialLinks(){
      const docRef = doc(db, "social", "link")

      getDoc(docRef)
      .then((snapshot) => {
          if(snapshot.data() !== undefined){
            setSocialLinks({
              facebook: snapshot.data()?.facebook,
              instagram: snapshot.data()?.instagram,
              youtube: snapshot.data()?.youtube,
            })
          }
      })
    }

    loadSocialLinks();
  }, [])

  // function loadLinks() {
  //   const linksRef = collection(db, "links");
  //   const queryRef = query(linksRef, orderBy("created", "asc"));

  //   getDocs(queryRef)
  //   .then((snapshot) => {
  //     let lista = [] as LinkProps[];
  //     snapshot.forEach((doc) => {
  //       lista.push({
  //         id: doc.id,
  //         name: doc.data().name,
  //         url: doc.data().url,
  //         bg: doc.data().bg,
  //         color: doc.data().color,
  //       })
  //     })

  //     setLinks(lista);
  //   })

  // }

  // useEffect(() => {
  //   loadLinks()
  // }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">kyoulau</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
      {links.map((link) => (
        <section
          key={link.id}
          className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <p className="text-base md:text-lg" style={{ color: link.color }}>
              {link.name}
            </p>
          </a>
        </section>
      ))}

      { socialLinks && Object.keys(socialLinks).length > 0 && (
        <footer className="flex justify-center gap-3 my-4">
          <Social  
            url="https://github.com/kyoulau"
            children={<FaMediumM />}
            // arrumar esses links para ficarem dinamicos
            />

          <Social  
            url="https://github.com/kyoulau"
            children={<FaGithub />}
            />

          <Social  
            url="https://github.com/kyoulau"
            children={<FaLinkedin />}
            />

          <Social  
            url="https://github.com/kyoulau"
            children={<FaInstagram />}
            />
        </footer>
      )}

      </main>
    </div>
  )
}

export default Home
