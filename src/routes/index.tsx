import { $, component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$( () => {

	const navigate = useNavigate();

	const pokemonGame = useContext( PokemonGameContext );

	// const pokemonId = useSignal( 1 );
	// const showBackImg = useSignal( false );
	// const isVisible = useSignal( false );

	const changePokemonId = $( ( value: number ) => {

		if ( pokemonGame.pokemonId + value < 1 ) return;

		pokemonGame.isPokemonVisible = false;

		pokemonGame.pokemonId += value;

	} );

	const goToPokemon = $( () => {

		navigate( `/pokemon/${ pokemonGame.pokemonId }/` );

	} );

	return (
		<>
			<span class="text-2xl">Buscador simple</span>
			<span class="text-9xl">{ pokemonGame.pokemonId }</span>

			{/* <Link href={ `/pokemon/${ pokemonId.value }/` }> */ }
			{/* </Link> */ }

			<div onClick$={ goToPokemon }>
				<PokemonImage
					pokemonId={ pokemonGame.pokemonId }
					backImg={ pokemonGame.showBackImage }
					isVisible={ pokemonGame.isPokemonVisible }
				/>
			</div>

			<div class="mt-2">
				<button onClick$={ () => changePokemonId( -1 ) } class="btn btn-primary mr-2">Anterior</button>
				<button onClick$={ () => changePokemonId( 1 ) } class="btn btn-primary mr-2">Siguiente</button>
				<button onClick$={ () => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Voltear</button>
				<button onClick$={ () => pokemonGame.isPokemonVisible = true } class="btn btn-primary">Revelar</button>
			</div>

		</>
	);
} );

export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'Primera app con Qwik',
		},
	],
};
