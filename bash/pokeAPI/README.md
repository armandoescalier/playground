# pokeAPI

`pokeAPI` is a bash script to consume and display pokemon data from the API: [pokeapi.co](https://pokeapi.co)

## Installation

To use the script it is necessary to clone the folder to your local.
```bash
git clone https://github.com/armandoescalier/playground.git
```

### Requirements

You need to install `jq`, a tool that allows you to read JSON files when using a bash script.

If you do not have it, you can install it quickly with the following commands:

#### For Linux:
```bash
sudo apt-get install jq
```

#### For Mac using Brew:
```bash
brew install jq
```

## Usage

Go to the pokeAPI directory.
```bash
cd bash/pokeAPI
```

Use the following command inside the `pokeAPI` directory to start using the script and search for your favorite pokemon!

```bash
bash ./pokeAPI 
```

Within the menu you have different options:

     F) Check the information of a pokemon by id.
     D) Clear cached data of pokemons
     S) Show statistics
     X) Exit

Write the letter you prefer in the terminal and enjoy collecting pokemons.