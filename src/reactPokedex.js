const POKEURL = "https://pokeapi.co/api/v2/pokemon/";

const useFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPokemon: [],
      allPokemonNames: [],
      nextUrl: "",
      loading: true,
      modalOpen: false,
      targetPokemon: {},
    };
  }

  getAllPokemonNames = async () => {
    const pushNames = (pokemon) => {
      pokemon.forEach((poke) => {
        this.state.allPokemonNames.push(poke.name);
      });
    };
    const getNext = async (url) => {
      try {
        const data = await useFetch(url);
        const pokemon = data.results;
        await pushNames(pokemon);

        if (data.next) {
          getNext(data.next);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNext(POKEURL);
  };

  // display cards function
  displayCards = (pokemon) => {
    // Isolate Pokemon Name & ID & picUrl
    const pokemonName = pokemon.data.name;
    const pokemonId = pokemon.pokemonId;
    const picUrl = pokemon.data.sprites.other["official-artwork"].front_default;

    return (
      <li id={pokemonId} onClick={this.handleClick} className="pokemon-card">
        <img src={picUrl} className="pokedex-card-img" />
        <h2>{pokemonName}</h2>
      </li>
    );
  };

  // Fetch pokeomon data and save it to array
  fetchSaveDisplayPokemonCards = async (pokemon) => {
    try {
      const pokeData = pokemon.map(async (poke) => {
        const data = await useFetch(poke.url);
        const pokemonId = data.id;
        return { pokemonId, data };
      });

      const pokeArray = await Promise.all(pokeData);
      this.state.loadedPokemon.push(...pokeArray);

      // this.displayCards(pokeArray);
      console.log(this.state.loadedPokemon);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch and display initial pokedex list - create load more button
  getInitialPokemon = async () => {
    try {
      const data = await useFetch(POKEURL);

      const pokemon = data.results;
      this.setState({ nextUrl: data.next });

      await this.fetchSaveDisplayPokemonCards(pokemon);

      // remove loading spinner
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Load Next click
  loadNext = async () => {
    this.setState({ loading: true });
    try {
      const data = await useFetch(this.state.nextUrl);
      const pokemon = data.results;
      this.setState({ nextUrl: data.next });

      await this.fetchSaveDisplayPokemonCards(pokemon);

      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getInitialPokemon();
    this.getAllPokemonNames();
  }

  render() {
    return (
      <div className="pokedex-wrapper">
        {this.modalOpen ? <Modal targetPokemon={this.targetPokemon} /> : null}
        <ul className="pokedex-card-wrapper">
          {this.state.loadedPokemon.map((poke) => {
            return this.displayCards(poke);
          })}
        </ul>
        {!this.loading ? (
          <button className="button cardpop-btn" onClick={this.loadNext}>
            Load More
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return;
  }
}

const domContainer = document.querySelector("#react-pokedex");
const root = ReactDOM.createRoot(domContainer);
root.render(<Pokedex />);
