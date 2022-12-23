function state(initialValue) {
  let value = initialValue;

  function getValue() {
    return value
  }

  function setValue(newValue) {
    value = newValue
  }

  return [getValue, setValue];
}

const [database, setDatabase] = state([
  {
    id: 0,
    title: "Pessoa desenvolvedora front-end - React",
    enterprise: "Kenzie",
    location: "Curitiba",
    descrition:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    modalities: ["Hibrido", "Presencial"],
  },
  {
    id: 1,
    title: "Pessoa desenvolvedora back-end - Node JS",
    enterprise: "Brazilians in Tech",
    location: "Rio de Janeiro",
    descrition:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    modalities: ["Home Office", "Presencial"],
  },
  {
    id: 2,
    title: "Pessoa desenvolvedora Fullstack - Node JS",
    enterprise: "Brazilians in Tech",
    location: "Rio de Janeiro",
    descrition:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    modalities: ["Home Office", "Presencial"],
  },
]);

const [cart, setCart] = state([]);

function cartAnalysis (){
  const cartLocalJSON = localStorage.getItem("cart")

  if(cartLocalJSON){
    const cartLocal = JSON.parse(cartLocalJSON)
    
    return setCart(cartLocal)
  }
}

function showJobs(jobs = database()) {
  const container = document.querySelector("#jobs")
  
  jobs.forEach((job) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <li class="container__vagas">
      <h3 class="container__vagas--titulo">${job.title}</h3>
      <div class="container__vagas--area">
      <span class="container__vagas--local">${job.enterprise}</span><span class="container__vagas--local">${job.location}</span>
      </div>
      <p class="container__vagas--texto">${job.descrition}</p>
      <span class="container__vagas--tipo">${job.modalities[0]}</span><span class="container__vagas--tipo">${job.modalities[1]}</span>
      <button onClick={addToCart(${job.id})} id={${job.id}} class="container__vagas--btn">Candidatar</button>
      </li>
      `
      )
    });
    return container
}
  
  function addToCart(id, jobs = database()) {
    const selectedJob = jobs.find((element) => element.id === id);
    
    setCart([...cart(), selectedJob])
    
    const productsJson = JSON.stringify(cart())
    
    localStorage.setItem("cart", productsJson)
    
    return showJobsInCart()
}
  
  function showJobsInCart(jobs = cart()) {
    const container = document.querySelector("#selectedJobs")
    
    container.innerHTML = "";
    
    jobs.forEach((job) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <li class="jobs">
        <h3 class="container__vagaSelecionada--titulo">${job.title}</h3> <button onClick={removeFromCart(${job.id})} id={${job.id}} class="fa-solid fa-trash container__vagas--button"></button>
        <div class="container__vagas--area">
        <span class="container__vagas--local">${job.enterprise}</span><span class="container__vagas--local">${job.location}</span>
        </div>
        </li>
        `
        )
      });
      return container;
}
    
  function removeFromCart(id, jobs = cart()) {
      const findJob = jobs.findIndex((element)=> element.id === id)
      
      const newCartJobs = [...jobs]
      
  newCartJobs.splice(findJob, 1)
  
  setCart(newCartJobs)
  
  const productsJOSN = JSON.stringify(cart())
  
  localStorage.setItem("cart", productsJOSN)
  
  return showJobsInCart();
}

cartAnalysis()
showJobs()
showJobsInCart()