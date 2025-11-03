import "./pokemon.css"
import{useState,useEffect} from "react";
import { PokemonCards } from "./PokemonCards";

export const PokemonCardProject = () =>{
   const [pokemon,setPokemon]=useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null)


    const fetchPokemon = async() =>{
    try{
     const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=96");
     const data = await res.json();
    
     const detailedData = data.results.map(async(curData)=>{
     const res=  await fetch(curData.url);
     const data = await res.json();  
     return data; 
});

const detailedResponse= await Promise.all(detailedData);
console.log(detailedResponse);
setPokemon(detailedResponse);
setLoading(false);
   } 
    catch(error){
     console.log(error);
     setLoading(false);
     setError(error);
    }
}



    useEffect(()=>{
    fetchPokemon();
    },[]);

    if(loading){
    return(
        <div>
            <h1>Loading...</h1>
        </div>
    )
}
if(error){
    return(
        <div>
      <h1>{error.message}</h1>
        </div>
    )
}


    return(
        <>
      <section className="container">
        <header>
             <h1>Lets Catch Pokemon</h1>
        </header>
     
       <div>
        <ul className="cards">
{
    pokemon.map((curElem)=>{
      return(
        <PokemonCards key={curElem.id}  PokemonData={curElem}/>
      );
    })
}
        </ul>
       </div>
        </section>
        </>
    );
};